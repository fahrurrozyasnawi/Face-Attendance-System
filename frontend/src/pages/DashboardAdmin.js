import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form';
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
  TableBody,
  Snackbar,
  Alert
} from '@material-ui/core'
import Clock from 'src/components/dashboard/Clock';
import { Table } from '@material-ui/core';
import { inc } from 'nprogress';

const DashboardAdmin = () => {
  let stream = false
  const { register, handleSubmit } = useForm();
  const [absenData, setAbsenData] = useState([])
  const [isStop, setIsStop] = useState(true)
  const [idAbsensi, setIdAbsensi] = useState(null)
  const [dataAbsensiRealtime, setDataAbsensiRealtime] = useState([])
  const [dataAbsensi, setDataAbsensi] = useState([])  
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false)
  const [type, setType] = useState()

  const msgSuccess = (msg = "Absensi sedang berjalan, harap tunggu!", severity='success') => {
    setMessage(msg)
    setType(severity)
  }
  const msgError = (msg="Absensi sudah dilakukan hari ini untuk mata kuliah tersebut", severity='error') => {
    setMessage(msg)
    setType(severity)
  }

  const handleClick = () => {
    setOpen(true)
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false)
  }
  
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
          handleClick()
          msgSuccess()
        } else {
          handleClick()
          msgError()
        }
      })
      .then(json => console.log("data ",json))
      .catch(err => {
        console.log("Telah dilakukan absensi hari ini!")
      })
  }

  const getHasilRealtime = async () => {
    await fetch('/hasil-absensi-realtime/' + idAbsensi, {
      method: 'GET'
    })
      .then(res => res.json())
      .then( data => {
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
    setIdAbsensi(id_absensi)
    startAttendance(id_absensi,data)
  }

  useEffect( () => {
    if (isStop) {
      getAbsenData()   
    }

   if (!isStop) {
    getDataAbsenRealtime()
    getHasilRealtime()
   }
    
  }, [isStop, dataAbsensiRealtime])
  
  console.log("Data ", dataAbsensiRealtime)
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
            sx={{ justifyContent : 'space-between' }}
          >
            <Grid 
              item
            >
              <Card>
                <Box
                  fullWidth
                  sx={{ justifyContent : 'center', p:1 }}
                >
                  { isStop ? (
                  <Box 
                    component="img"
                    sx={{
                      height : 300,
                      width : 450
                    }}
                    // src={"D:/TMJ 17/Tugas Akhir/Project/Face-Attendance-System/backend/src/mahasiswaImage/42617020.JPG"}
                    src={null}
                  />
                  ) : (
                  <Box 
                    display="block"
                    component="img"
                    sx={{
                      height : 300,
                      width : 'auto'
                    }}
                    src={'/start-attendance/' + idAbsensi}
                  />
                )}
                </Box>
              </Card>
            </Grid>
            <Grid 
              item
              lg={6}
              sm={4}
              xl={8}
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
                    <Grid 
                      item
                      // marginBottom={20}
                      sx={{
                         py : 1,
                         mb : 4
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
                sx={{ py : 2, mx: 1 }}
              >
                    <Grid 
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={6}
                  >
                    <Typography variant='body2' > Kelas : {data.kelas} </Typography>
                  </Grid>
                  <Grid 
                    item
                    lg={6}
                    sm={6}
                    xl={6}
                    xs={6}
                  >
                    <Typography variant='body2' > Mata Kuliah : {data.mataKuliah} </Typography>
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
                    {dataAbsensiRealtime.map((data, index) => {
                      return (
                      <TableBody key={index}>
                      {data.mahasiswa.map((m, i) => (
                        <TableRow
                          hover
                          key={i}
                        >
                          <TableCell>{m.nim}</TableCell>
                          <TableCell>{m.namaLengkap}</TableCell>
                          <TableCell
                            // color={}
                          >{m.status}</TableCell>
                          {console.log("Terdeteksi ", m.status)}
                        </TableRow>
                      ))}
                      </TableBody>)
                     })}
                  </Table>
                  )}
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Snackbar
        sx={{
          justifyContent: 'center'
        }}
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        // message="I love snacks"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Alert onClose={handleClose} severity={type} >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardAdmin;
