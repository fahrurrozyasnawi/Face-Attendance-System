import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet'
import {useForm} from 'react-hook-form';
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  Typography,
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import Clock from 'src/components/dashboard/Clock';
import { Table } from '@material-ui/core';
import { inc } from 'nprogress';

const DashboardAdmin = () => {
  let stream = false
  const { register, handleSubmit } = useForm();
  const [absenData, setAbsenData] = useState([])
  const [absenId, setAbsenId] = useState("")
  const [dataCapture, setDataCapture] = useState(null)
  const [isStop, setIsStop] = useState(true)
  const [idAbsensi, setIdAbsensi] = useState(null)
  const [dataAbsensiRealtime, setDataAbsensiRealtime] = useState([])
  const [dataAbsensi, setDataAbsensi] = useState([])  

  const getAbsenData = async () => {
    await fetch('/data-absen', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setAbsenData(data)
      })
  }
  
  const handlingAttendance = () => {
    setIsStop(false)
  }
  
  const handlingStopAttendance = () => {
    setIsStop(true)
    const a = fetch('/stop')
    console.log("Stop ", a)
    // {'/stop'}
  }
  

  const startAttendance = async (id, data) => {
    await fetch('/start-attendance/' + id, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        // startCamera(id)
        res.json()
        console.log("a1 ", res['status'])
        if ( res['status'] == 200 ) {
          handlingAttendance()
          // getHasilRealtime()
          // getDataAbsenRealtime()
        }
      })
      .then(json => console.log("data ",json))
      .catch(err => console.log("Telah dilakukan absensi hari ini!"))
  }

  const startCamera = async () => {
    await fetch('/start-attendance/' + idAbsensi, {
      method: 'GET'
    })
      .then(res => res.json())
      .then( data => {
        setDataCapture(data)
        // setIsStop(true)
      })
      .catch( err => console.log("Absen sudah ada!!"))
  }

  const getHasilRealtime = async () => {
    await fetch('/hasil-absensi-realtime/' + idAbsensi, {
      method: 'GET'
    })
      .then(res => res.json())
      .then( data => {
        // const dataHasil = data.map((hasil, i) => ({
        // }))
        setDataAbsensiRealtime([...data])
      })
  }
  
  const getDataAbsenRealtime = async () => {
    await fetch('/hasil-data-absensi/' + idAbsensi, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setDataAbsensi(data))
  }
  
  const onSubmit = (data) => {
    let id_absensi = data['dataAbsensi'][0]
    console.log("Id onSubmit ", id_absensi)
    setIdAbsensi(id_absensi)
    startAttendance(id_absensi,data)
    // stream = true
    // startCamera(id_absensi)
    // getDataAbsenRealtime()
    console.log("onSubmit ",data)
  }
  
  // const inCallback = useCallback( () => {
  //   getDataAbsenRealtime()
  //   getHasilRealtime()
  // })

  useEffect( () => {
    if (isStop) {
      getAbsenData()   
    }
    // inCallback()
    // inCallback()
   if (!isStop) {
    getDataAbsenRealtime()
    getHasilRealtime()
    // return 0
   }
  //  inCallback()
    
  }, [isStop, dataAbsensiRealtime])

  // console.log("Absen data ", absenData)
  // console.log("Data Capture ", dataCapture)
  console.log("Data Absensi Realtime ", dataAbsensiRealtime)
  console.log("Data Absen Hasil ", dataAbsensi)
  // console.log(onSubmit())
  return (
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
        <Container 
          maxWidth
          sx={{ py : 1}}
        >
          <Grid
            container
            spacing={2}
            // sx={{ justifyContent : 'flex-end' }}
          >
            <Grid 
              item
              lg={8}
              sm={6}
              xl={8}
              xs={12}
            >
              <Card>
              { isStop ? (
                <Box 
                  component="img"
                  sx={{
                    height : 300,
                    width : 'auto'
                  }}
                  src={null}
                />
                ) : (
                <Box 
                  component="img"
                  sx={{
                    height : 300,
                    width : 'auto'
                  }}
                  src={'/start-attendance/' + idAbsensi}
                />
              )}
                
              </Card>
            </Grid>
            <Grid 
              item
              lg={4}
              sm={6}
              xl={4}
              xs={12}
            >
              <form
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
              >
              <Card fullWidth >
                <CardContent>
                  <Grid
                    fullWidth
                  >
                    <Grid item
                      sx={{
                         py : 1,
                        }}
                    >
                      <FormControl variant="outlined" fullWidth disabled={isStop ? false : true} >
                        <InputLabel id="label-absensi">Pilih Absensi</InputLabel>
                        <Select
                          {...register("dataAbsensi")}
                          labelId="label-absensi"
                          label="Pilih Absensi"
                          required
                          // onChange={getIdAbsen}
                        >
                          {absenData.map((option, index) => (
                            <MenuItem key={option._id} value={[option._id, option.nip, option.kelas, option.programStudi]}>
                              {option.namaDosen + " | " +  option.mataKuliah + " - " + option.kelas}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Divider />
                    <Box
                     fullWidth
                    //  sx={{ flexDirection : 'row-reverse', mt: 1 }}
                    >
                      {isStop ? (
                        <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        sx={{ m: 1}}
                        >
                          Mulai
                        </Button>
                       ) : (
                        <Button
                        color='secondary'
                        variant='contained'
                        sx={{ m: 1}}
                        onClick={handlingStopAttendance}
                        >
                          Stop
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
        <Container 
          maxWidth
          sx={{ mt : 1 }}
        >
          <Card>
            <CardContent>
            {dataAbsensi.map((data) => {
              return (
              <Grid 
                container
                spacing={1}
              >
                    <Grid 
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={6}
                  >
                    <Typography variant='subtitle1' > Kelas : {data.kelas} </Typography>
                  </Grid>
                  <Grid 
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={6}
                  >
                    <Typography variant='subtitle1' > Mata Kuliah : {data.mataKuliah} </Typography>
                  </Grid>
               
              </Grid>
              )})}
              <Divider />
              <Grid 
                container
                sx={{ justifyContent : 'center' }}
              >
                {isStop ? (
                  <Typography sx={{ textAlign : 'center' }} >Run Attendance to get Realtime Table</Typography>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          NIM
                        </TableCell>
                        <TableCell>
                          Nama
                        </TableCell>
                        <TableCell>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataAbsensiRealtime.map((mahasiswa, i) => {
                        return (
                          <TableRow
                            hover
                            key={mahasiswa._id}
                          >
                            <TableCell>{console.log(mahasiswa.nim)}</TableCell>
                            <TableCell>{mahasiswa.namaLengkap}</TableCell>
                            <TableCell>{mahasiswa.status}</TableCell>
                          </TableRow>)
                      })}
                    </TableBody>
                  </Table>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardAdmin;
