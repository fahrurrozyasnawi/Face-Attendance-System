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
import CustomerListResults from 'src/components/customer/CustomerListResults';


const MahasiswaAdmin = () => {
  const [mahasiswa, setMahasiswa] = useState([])

  // const getSortBy = (a,b) => {
    
  // }
  

  const getDataMahasiswa = () => {
    fetch('/data-mahasiswa', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setMahasiswa(data)
      })
    }

  useEffect(() => {
    getDataMahasiswa()
  },[mahasiswa])
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
          <MahasiswaToolbar />
          <Box sx={{pt: 3 }} >
            {/* <MahasiswaKelasList /> */}
            <MahasiswaList dataMahasiswa={mahasiswa} />
            {/* <CustomerListResults customers={customers} /> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MahasiswaAdmin;
