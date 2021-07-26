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
  if request.method == 'POST':
    data = mahasiswaCol.insert({
    # '_id': request.json['nim'],
    'namaLengkap': request.json['namaLengkap'],
    'nim': request.json['nim'],
    'kelas': request.json['kelas'],
    'angkatan': request.json['angkatan'],
    'programStudi': request.json['programStudi']
    })
    return jsonify({'status': "Data telah disimpan"}, data)
  
  if request.method == 'GET':
    dataMahasiswa = []
    for doc in mahasiswaCol.find():
      doc['_id'] = str(ObjectId(doc['_id']))
      dataMahasiswa.append(doc)
    return jsonify(dataMahasiswa)

#One Data Mahasiswa
@app.route('/mahasiswa/<id>', methods=['GET','DELETE','PUT'])
def oneDataMahasiswa(id):
  #Get one data
  if request.method == 'GET':

    Mahasiswa = []
    dataMahasiswa = []
    mahasiswa = mahasiswaCol.find_one({'_id': ObjectId(id)})
      # doc['_id'] = str(ObjectId(doc['_id']))
    Mahasiswa.append(mahasiswa)

    for data in Mahasiswa:
      data['_id'] = str(ObjectId(data['_id']))
      dataMahasiswa.append(data)

    # dataMahasiswa.append(mahasiswa)
    print(dataMahasiswa)
    return jsonify(dataMahasiswa)
  
  #Delete data
  if request.method == 'DELETE':
    mahasiswaCol.delete_one({'_id' : ObjectId(id)})
    return jsonify({'msg' : 'Data telah dihapus'})
  
  #Update data
  if request.method == 'PUT':
    mahasiswaCol.update_one({'_id': ObjectId(id)}, {'$set': {
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
  return "Data Dosen"

@app.route('/dosen/<id>', methods=['GET','DELETE','PUT'])
def getOneDosen(id):
  return "Sukses"

# END API ABSEN

if __name__ == "__main__":
  app.run(debug=True)
