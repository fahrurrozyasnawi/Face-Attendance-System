import React from 'react'
import { Helmet } from 'react-helmet'
import {
  Container,
  Box
} from '@material-ui/core'
import MahasiswaKelasList from 'src/components/mahasiswa/MahasiswaKelasList'
import MahasiswaToolbar from 'src/components/mahasiswa/MahasiswaToolbar'


const MahasiswaAdmin = () => {
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
            <MahasiswaKelasList />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default MahasiswaAdmin
