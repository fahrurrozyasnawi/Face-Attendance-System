import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  Container,
  Box
} from '@material-ui/core';
import MahasiswaKelasList from 'src/components/mahasiswa/MahasiswaKelasList';

import EditMahasiswa from 'src/components/mahasiswa/EditMahasiswa'
import MahasiswaToolbar from 'src/components/mahasiswa/MahasiswaToolbar';
import customers from 'src/__mocks__/customers';
// import EditMahasiswa from 'src/components/mahasiswa/EditMahasiswa'
import { Outlet } from 'react-router';


const MahasiswaAdmin = (props) => {
  const [dataMahasiswa, setDataMahasiswa] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  // const pathLink = "/admin/mahasiswa"

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value)
  // }

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
          {/* <MahasiswaToolbar searchTerm={props.searchTerm} handleSearch={props.handleSearch} /> */}
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default MahasiswaAdmin;
