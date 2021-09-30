import React from 'react';
import {
  Box,
  Typography,
  Container
} from '@material-ui/core';
import { Outlet } from 'react-router'
import { Helmet } from 'react-helmet'

const HasilAbsensi = (props) => {
  return (
    <>
      <Helmet>
        <title>Hasil Absensi | Face Attendance</title>
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

export default HasilAbsensi;
