from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/face-attendance'
mongo = PyMongo(app)

mahasiswaCol = mongo.db.mahasiswa
dosenCol = mongo.db.dosen
absenCol = mongo.db.absen

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
    # 'data' : [{
    #   'nim' : request.json['nim'],
    #   'namaLengkap' : request.json['namaLengkap']
    # }],
    'kelas': request.json['kelas'],
    'angkatan': str(request.json['angkatan']),
    'programStudi': request.json['programStudi']
    })
    
    return jsonify({'status': "Data telah disimpan"})
      # return jsonify(idAll)
    # if test2:
    #   return jsonify({"error" : "Data sudah ada!!"})

#One Data Mahasiswa
@app.route('/mahasiswa/<id>', methods=['GET','DELETE','PUT'])
def oneDataMahasiswa(id):
  #Get one data
  if request.method == 'GET':

    Mahasiswa = []
    dataMahasiswa = []
    mahasiswa = mahasiswaCol.find_one_or_404({'_id': id})
      # doc['_id'] = str(ObjectId(doc['_id']))
    Mahasiswa.append(mahasiswa)

    for data in Mahasiswa:
      # data['_id'] = data['_id']
      dataMahasiswa.append(data)

    # dataMahasiswa.append(mahasiswa)
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
    'angkatan': request.json['angkatan'],
    'programStudi': request.json['programStudi']
    }})
  
    return jsonify({'msg': 'Data telah terupdate!!'})

# END API MAHASISWA

# API DOSEN
@app.route('/data-dosen', methods=['GET','POST'])
def allDataDosen():
  # POST
  if request.method == 'POST':
    data = dosenCol.insert({
    '_id' : request.json['nip'],
    'namaDosen': request.json['namaDosen'],
    'nip': request.json['nip'],
    'programStudi': request.json['programStudi']
    })
    return jsonify({"status": "Data berhasil disimpan"})

@app.route('/dosen/<id>', methods=['GET','DELETE','PUT'])
def getOneDosen(id):
  return "Sukses"

# END API ABSEN

if __name__ == "__main__":
  app.run(debug=True)
