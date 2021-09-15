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
  Typography,
  CardMedia
} from '@material-ui/core'
import Clock from 'src/components/dashboard/Clock';

const Dashboard = () => {
  
  return(
    <Box
      sx={{
        px : 2,
        py : 2
      }}
    >
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
        <Container maxWidth >
          <Grid>
            <Typography variant='h5' >
              Dashboard
            </Typography>
          </Grid>
        </Container>
        <Container maxWidth >
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
        <Container maxWidth >
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Card maxWidth={345} >
                <CardMedia 
                  sx={{
                    height: 140
                  }}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};
export default Dashboard;