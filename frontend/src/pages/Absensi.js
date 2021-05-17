import { Box, Container, Grid } from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'

const Absensi = () => {
  return (
    <>
      <Helmet>
        <title>Absensi | Face Attendance</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        <Container>
          <Box>
            <Grid></Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Absensi
