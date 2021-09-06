import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Box
} from '@material-ui/core';
import DosenList from 'src/components/dosen/DosenList';
import DosenToolbar from 'src/components/dosen/DosenToolbar';

const DosenAdmin = () => {
  const [dosen, setDosen] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  
  const getDataDosen = async () => {
    fetch('/data-dosen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        data = !searchTerm
          ? data
          : data.filter(person =>
              person.namaDosen.toLowerCase().includes(searchTerm.toLowerCase()))
        setDosen(data)
      })
    }

  useEffect(() => {
    getDataDosen()
  },[])

  return (
    <>
      <Helmet>
        <title>Dosen | Face Attendance</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        <Container maxWidth={false} >
          <DosenToolbar searchTerm={searchTerm} onSearchChange={handleSearch} />
          <Box sx={{ pt: 3 }}>
            <DosenList dataDosen={dosen} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default DosenAdmin;
