import { 
  Box, 
  Container 
} from '@material-ui/core';
import React from 'react';
import { Helmet } from 'react-helmet';
import CustomerListResults from 'src/components/customer/CustomerListResults';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const Mahasiswa = () => (
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
        <CustomerListToolbar />
        <Box sx={{pt: 3 }} >
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>

  </>
);

export default Mahasiswa;
