from logging import NullHandler
from face_recognition.api import face_distance
from flask import Flask, json, request, jsonify, Response
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from datetime import date, time, datetime
#from app import courseid
import cv2, queue, threading, time
import mtcnn
import face_recognition
import os
import numpy as np

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/face-attendance'
mongo = PyMongo(app)

CORS(app)

mahasiswaCol = mongo.db.mahasiswa
dosenCol = mongo.db.dosen
absenCol = mongo.db.data_absen
hasilAbsenCol = mongo.db.hasi_absensi

# START FACE RECOGNITION
ds_factor=0.6
detector = mtcnn.MTCNN()

# Class 2
class VideoCamera(object):
  #courseid=''
  def __init__(self):

      self.video = cv2.VideoCapture(0)

  def __del__(self):
      self.video.release()

  path = 'src/mahasiswaImage'
  images = []

  classNames = []
  myList = os.listdir(path)
  # print(myList)
  for cl in myList:
      curImg = cv2.imread(f'{path}/{cl}')
      images.append(curImg)
      classNames.append(os.path.splitext(cl)[0])
  print(classNames)

  def findEncodings(images):
      encodeList = []

      for img in images:
          img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
          encode = face_recognition.face_encodings(img)[0]
          encodeList.append(encode)
      return encodeList

  encodeListKnown = findEncodings(images)
  process_this_frame = True
  
  # def takeAttend():
  #     return 0

  def get_frame(self, id, tglAbsen):
    success, image = self.video.read()
    if VideoCamera.process_this_frame:
      image=cv2.resize(image,None,fx=ds_factor,fy=ds_factor,interpolation=cv2.INTER_AREA)
      gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
      rgb=cv2.cvtColor(gray,cv2.COLOR_GRAY2RGB)
      face_rects= detector.detect_faces(rgb)
      # face_box = face_rects[0]['box']
      # face_rects = getattr(face_rects, 'box')
      # face_rects= detector.detect_faces(gray,1.3,5)
      # print("From mtcnn ",face_box)
      print("From mtcnn ",face_rects)

      imgS = cv2.resize(image, (0, 0), None, 0.25, 0.25)
      # imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
      imgS = imgS[:, :, ::-1]
      facesCurFrame = face_recognition.face_locations(imgS)
      # facesCurFrame = detector.detect_faces(imgS)
      # facesCurFrame = facesCurFrame[0]['box']
      print("FaceCurFrame ", facesCurFrame)
      encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

      for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(VideoCamera.encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(VideoCamera.encodeListKnown, encodeFace)
        print(faceDis)
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
          name = VideoCamera.classNames[matchIndex].upper()
          markAttendance(id, name, tglAbsen)
          print("Terdeteksi ",name)
          # for (x,y,w,h) in face_rects:
          for face_rect in face_rects:
            x,y,w,h = face_rect['box']
            cv2.rectangle(image,(x,y),(x+w,y+h),(0,255,0),2)
            cv2.putText(image, name, (x + 6, (y+h) - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            break
          # markAttendance(id, name)
    VideoCamera.process_this_frame = not VideoCamera.process_this_frame
    ret, jpeg = cv2.imencode('.jpg', image)
    return jpeg.tobytes()

def markAttendance(id, name, tglAbsen):
  hasilAbsenCol.update_one(
    {"_id" : tglAbsen, "kode_absensi" : id, "mahasiswa._id" : name},
    {
      "$set" : {"mahasiswa.$.status" : "Hadir"}
    }
  )

# START API MAHASISWA
#All Data Mahasiswa
@app.route('/data-mahasiswa', methods=['POST','GET'])
def allDataMahasiswa():
  #POST Data
  dataMahasiswa = []
  idData = []

  if request.method == 'GET':
    for doc in mahasiswaCol.find():
      # doc['_id'] = doc['_id']
      dataMahasiswa.append(doc)
    return jsonify(dataMahasiswa)

  if request.method == 'POST':
    
    data = mahasiswaCol.insert({
    '_id' : request.json['nim'],
    'namaLengkap': request.json['namaLengkap'],
    'nim': request.json['nim'],
    'kelas': request.json['kelas'][0],
    'angkatan': str(request.json['angkatan']),
    'programStudi': request.json['programStudi'][0],
    'status': "Alpa"
    })
    
    return jsonify({'status': "Data telah disimpan"})

#One Data Mahasiswa
@app.route('/mahasiswa/<id>', methods=['GET','DELETE','PUT'])
def oneDataMahasiswa(id):
  #Get one data
  if request.method == 'GET':

    Mahasiswa = []
    dataMahasiswa = []
    mahasiswa = mahasiswaCol.find_one_or_404({'_id': id})
    Mahasiswa.append(mahasiswa)

    for data in Mahasiswa:
      dataMahasiswa.append(data)

    print(dataMahasiswa)
    return jsonify(dataMahasiswa)
  
  #Delete data
  if request.method == 'DELETE':
    mahasiswaCol.delete_one({'_id' : id})
    return jsonify({'msg' : 'Data telah dihapus'})
  
  #Update data
  if request.method == 'PUT':
    mahasiswaCol.update_one({'_id': id}, {'$set': {
    'namaLengkap': request.json['namaLengkap'],
    'nim': request.json['nim'],
    'kelas': request.json['kelas'],
    'angkatan': str(request.json['angkatan']),
    'programStudi': request.json['programStudi'][0]
    }})
  
    return jsonify({'msg': 'Data telah terupdate!!'})

# END API MAHASISWA

# API DOSEN
@app.route('/data-dosen', methods=['GET','POST'])
def allDataDosen():
  dataDosen = []
  # POST
  if request.method == 'POST':
    data = dosenCol.insert({
    '_id' : request.json['nip'],
    'namaDosen': request.json['namaDosen'],
    'nip': str(request.json['nip']),
    'programStudi': request.json['programStudi'][0]
    })
    return jsonify({"status": "Data berhasil disimpan"})
  
  if request.method == 'GET':
    for doc in dosenCol.find():
      dataDosen.append(doc)
    return jsonify(dataDosen)

@app.route('/dosen/<id>', methods=['GET','DELETE','PUT'])
def getOneDosen(id):
  #Get one data
  if request.method == 'GET':
    Dosen = []
    dataDosen = []
    dosen = dosenCol.find_one_or_404({'_id': id})
    Dosen.append(dosen)

    for data in Dosen:
      dataDosen.append(data)
    return jsonify(dataDosen)
  
  #Delete data
  if request.method == 'DELETE':
    dosenCol.delete_one({'_id' : id})
    return jsonify({'msg' : 'Data telah dihapus'})
  
  #Update data
  if request.method == 'PUT':
    dosenCol.update_one({'_id': id}, {'$set': {
    'namaDosen': request.json['namaDosen'],
    'nip': str(request.json['nip']),
    'programStudi': request.json['programStudi'][0]
    }})

    return jsonify({'msg': 'Data telah terupdate!!'})

# END API DOSEN

# START API ABSEN
@app.route('/data-absen', methods=['GET','POST'])
def alldataAbsen():
  dataAbsen = []
  mahasiswa = []

  if request.method == 'POST':
    idAbsen = request.json['programStudi'][1] + request.json['kelas'][1] + request.json['namaDosen'][1]
    # Input to db
    absenCol.insert({
      '_id': idAbsen,
      'namaDosen': request.json['namaDosen'][0],
      'nip': request.json['namaDosen'][1],
      'kelas': request.json['kelas'][0],
      'programStudi': request.json['programStudi'][0],
      'mataKuliah': request.json['mataKuliah'][0],
      'tahunAjaran': request.json['tahunAjaran'],
      'kodeAbsensi' : idAbsen
    })
    return jsonify({'status': "Data telah disimpan"})

  if request.method == 'GET':
    for doc in absenCol.find():
      # doc['_id'] = doc['_id']
      dataAbsen.append(doc)
    return jsonify(dataAbsen)

@app.route('/absen/<id>', methods=['GET', 'PUT', 'DELETE'])
def oneDataAbsen(id):
  mahasiswa = []
  #get
  if request.method == 'GET':
    Absen = []
    dataAbsen = []
    absen = absenCol.find_one_or_404({'_id': id})
    Absen.append(absen)

    for data in Absen:
      dataAbsen.append(data)
    
    return jsonify(dataAbsen)
  
  #delete
  if request.method == 'DELETE':
    absenCol.delete_one({'_id': id})
    return jsonify({'status': "Data telah dihapus"})
  
  #update
  if request.method == 'PUT':

    kelas = request.json['kelas'][0]
    print("kelas ", kelas)
    for doc in mahasiswaCol.find({'kelas': kelas}, 
    {'kelas': 0, 'angkatan': 0, 'programStudi': 0}):
      mahasiswa.append(doc)

    absenCol.update_one({'_id': id}, {'$set': {
      'namaDosen': request.json['namaDosen'][0],
      'nip': request.json['namaDosen'][1],
      'kelas': request.json['kelas'][0],
      'programStudi': request.json['programStudi'][0],
      'mataKuliah': request.json['mataKuliah'][0],
      'tahunAjaran': request.json['tahunAjaran']
    }})
    return jsonify({'msg': 'Data telah disimpan'})
  
# END API ABSENSI

def gen(camera, id, tglAbsen):
  while True:
    frame = camera.get_frame(id, tglAbsen)
    yield (b'--frame\r\n'
           b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/start-attendance/<id>', methods=['POST', 'GET'])
def startAttendance(id):
  mahasiswa = []
  data = []
  now = datetime.now()
  tglAbsen = now.strftime("%d/%m/%Y")
  idAbsen = now.strftime("%d"+"%m"+"%Y")
  waktuAbsen = now.strftime("%H:%M:%S")


  if request.method == 'POST':
    # Absensi Logic
    # idAbsen = request.json['dataAbsensi'][0]
    idDosen = request.json['dataAbsensi'][1]
    print("ID Absen ", id)
    print("ID Dosen ", idDosen)

    kelas = request.json['dataAbsensi'][2]
    prodi = request.json['dataAbsensi'][3]
    print("Prodi ", prodi)
    print("Kelas ", kelas)

    for doc in mahasiswaCol.find({ 'kelas': kelas, 'programStudi' : prodi }, 
    {'kelas': 0, 'angkatan': 0, 'programStudi': 0}):
      mahasiswa.append(doc)

    hasilAbsenCol.insert({
      '_id' : idAbsen + id,
      'kode_absensi' : id,
      'tglAbsensi' : tglAbsen,
      'waktuAbsensi': waktuAbsen,
      'mahasiswa' : mahasiswa
    })

    return jsonify({"msg" : "Sukses"})
  
  if request.method == "GET":
    # Running fr
    return Response(gen(VideoCamera(), id, idAbsen),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/video')
def video():
  return Response(gen(VideoCamera()), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
  app.run(debug=True)
