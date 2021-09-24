import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Box
} from '@material-ui/core';
import DosenList from 'src/components/dosen/DosenList';
import DosenToolbar from 'src/components/dosen/DosenToolbar';
import { Outlet } from 'react-router';

const DosenAdmin = () => {  

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
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default DosenAdmin;
