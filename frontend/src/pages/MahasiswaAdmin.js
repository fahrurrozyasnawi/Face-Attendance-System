import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Box
} from '@material-ui/core';
import MahasiswaKelasList from 'src/components/mahasiswa/MahasiswaKelasList';
import MahasiswaList from 'src/components/mahasiswa/MahasiswaList'
import MahasiswaToolbar from 'src/components/mahasiswa/MahasiswaToolbar';
import customers from 'src/__mocks__/customers';
// import EditMahasiswa from 'src/components/mahasiswa/EditMahasiswa'
import { Outlet } from 'react-router';


const MahasiswaAdmin = (props) => {
  const [dataMahasiswa, setDataMahasiswa] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const addDataToState = (mahasiswa) =>{
    setDataMahasiswa([...dataMahasiswa, mahasiswa])
  }
  
  const updateState = (mahasiswa) => {
    const mahasiswaIndex = dataMahasiswa.findIndex(data => data._id === mahasiswa._id)
    const newArray = [...dataMahasiswa.slice(0, mahasiswaIndex), mahasiswa, ...dataMahasiswa.slice(mahasiswaIndex + 1)]
    setDataMahasiswa(newArray)  
  }

  const deleteFromState = (id) => {
    const updatedDataMahasiswa = dataMahasiswa.filter(mahasiswa => mahasiswa.id !== id)
    setDataMahasiswa(updatedDataMahasiswa)  
  }
  
  
  // const getDataMahasiswa = async () => {
  //   fetch('/data-mahasiswa', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       data = !searchTerm
  //         ? data
  //         : data.filter(person =>
  //             person.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()))
  //       setDataMahasiswa(data)
  //     })
  //   }

  // useEffect(() => {
  //   getDataMahasiswa()
  // },[])
  // console.log(mahasiswa)

  return (
    <>
      <Helmet>
        <title>Mahasiswa | Face Attendance</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        <Container maxWidth={false} >
          <MahasiswaToolbar searchTerm={searchTerm} onSearchChange={handleSearch} />
          <Box sx={{pt: 3 }} >
            <MahasiswaList />
            {/* <Outlet /> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MahasiswaAdmin;
