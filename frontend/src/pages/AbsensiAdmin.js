import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Box
} from '@material-ui/core';
import AbsenToolbar from 'src/components/absen/AbsenToolbar'
import AbsenList from 'src/components/absen/AbsenList'
import { Outlet } from 'react-router';

const AbsensiAdmin = (props) => {

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
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default AbsensiAdmin;
