from logging import NullHandler
from flask import Flask, json, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
from datetime import datetime
#from app import courseid
import cv2
import face_recognition
import os
import numpy as np

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/face-attendance'
mongo = PyMongo(app)

CORS(app)

mahasiswaCol = mongo.db.mahasiswa
dosenCol = mongo.db.dosen
absenCol = mongo.db.absen

class VideoCamera(object):
    #courseid=''
    def __init__(self):

        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    path = 'D:/TMJ 17/Tugas Akhir/Project/Face-Attendance-System/backend/src/mahasiswaImage'
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

    def get_frame(self, id):
        success, image = self.video.read()
        if VideoCamera.process_this_frame:
            image=cv2.resize(image,None,fx=ds_factor,fy=ds_factor,interpolation=cv2.INTER_AREA)
            gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
            face_rects=face_cascade.detectMultiScale(gray,1.3,5)

            imgS = cv2.resize(image, (0, 0), None, 0.25, 0.25)
            imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
            facesCurFrame = face_recognition.face_locations(imgS)
            encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

            for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
                matches = face_recognition.compare_faces(VideoCamera.encodeListKnown, encodeFace)
                faceDis = face_recognition.face_distance(VideoCamera.encodeListKnown, encodeFace)
                print(faceDis)
                matchIndex = np.argmin(faceDis)

                if matches[matchIndex]:
                    name = VideoCamera.classNames[matchIndex].upper()
                    print(name)
                    for (x,y,w,h) in face_rects:
                        cv2.rectangle(image,(x,y),(x+w,y+h),(0,255,0),2)
                        cv2.putText(image, name, (x + 6, (y+h) - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
                        break
                    markAttendance(id, name)
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

def markAttendance(id, name):
  absenCol.update(
    { "_id" : id, "mahasiswa._id" : name },
    {
      "$set": {"status": "Hadir"}
    }
  )

class VideoCapture:
  def __init__(self, name):
    self.cap = cv2.VideoCapture(name)
    self.q = queue.Queue()
    t = threading.Thread(target=self._reader)
    t.daemon = True
    t.start()

  # read frames as soon as they are available, keeping only most recent one
  def _reader(self):
    while True:
      ret, frame = self.cap.read()
      if not ret:
        break
      if not self.q.empty():
        try:
          self.q.get_nowait()   # discard previous (unprocessed) frame
        except queue.Empty:
          pass
      self.q.put(frame)

  def read(self):
    return self.q.get()

# * -------------------- USERS -------------------- *
# detector = mtcnn.MTCNN()
known_face_encodings = []
known_face_names = []
known_faces_filenames = []

for (dirpath, dirnames, filenames) in os.walk('mahasiswaImage/'):
  known_faces_filenames.extend(filenames)
  break

for filename in known_faces_filenames:
  face = face_recognition.load_image_file('mahasiswaImage/' + filename)
  known_face_names.append(re.sub("[0-9]",'', filename[:-4]))
  known_face_encodings.append(face_recognition.face_encodings(face)[0])

face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:
      frame = video_capture.read()
      frame = cv2.resize(frame,None,fx=ds_factor,fy=ds_factor,interpolation=cv2.INTER_AREA)
      gray = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
      face_rects = detector.detectMultiScale(gray,1.3,5)

      imgS = cv2.resize(frame, (0, 0), None, 0.25, 0.25)
      imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
      facesCurFrame = face_recognition.face_locations(imgS)
      encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

      if process_this_frame:
        face_locations = face_recognition.face_locations(frame)
        face_encodings = face_recognition.face_encodings(frame, face_locations)

        face_names = []

        for face_encoding in face_encodings:
          matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
          face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
          best_match_index = np.argmin(face_distances)

          if matches[best_match_index]:
            name = known_face_encodings[best_match_index]

            # Send attendance to db
            absenCol.update(
              { "_id" : id, "mahasiswa._id" : name },
              {
                "$set": {"status": "Hadir"}
              }
            )
          
          face_names.append(name)

      process_this_frame = not process_this_frame

      for (x,y,w,h) in face_rects:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(0,255,0),2)
        cv2.putText(frame, name, (x + 6, (y+h) - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
        break

      cv2.imshow('Video', frame)

      ret, jpeg = cv2.imencode('.jpg', frame)
      