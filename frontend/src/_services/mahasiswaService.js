const mahasiswaService = {
  getAllMahasiswa,
  getOneMahasiswa,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa
}

function getAllMahasiswa(){
  fetch('/data-mahasiswa/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
}

function getOneMahasiswa(id){
  fetch('/mahasiswa/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      const response = res
      return response
    })
  return res
}

function createMahasiswa(data){
  fetch('/data-mahasiswa/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
  return res
}

function updateMahasiswa(id, data){
  fetch('/mahasiswa/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
  return res
}

function deleteMahasiswa(id){
  fetch('/mahasiswa/' + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
  return res
}

export default mahasiswaService