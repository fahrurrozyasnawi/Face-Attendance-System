import React, { useEffect, useState} from 'react'
import { Helmet } from 'react-helmet'
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography
} from '@material-ui/core'
import Clock from 'src/components/dashboard/Clock';

const Dashboard = () => {
  
  return(
    <>
      <Helmet>
        <title>Dashboard | Face Attendance</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 1
        }}
      >
        <Container>
          <Grid>
            <Typography variant='h5' >
              Dashboard
            </Typography>
          </Grid>
        </Container>
        <Container maxWidth={false}>
          <Grid
            container
            justifyContent='space-between'
            spacing={1}
          >
            <Grid item
              // lg={6}
            />
            <Grid
              item
              lg={3}
              sm={3}
              xl={3}
              xs={4}
            >
              <Clock />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Card>
                TEXT
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default Dashboard;