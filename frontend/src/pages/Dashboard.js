import React, { useEffect, useState} from 'react'
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
  TableCell
} from '@material-ui/core'
import Clock from 'src/components/dashboard/Clock';
import { Table } from '@material-ui/core';

const Dashboard = () => {
  let id_absensi = null
  let stream = false
  const { register, handleSubmit } = useForm();
  const [absenData, setAbsenData] = useState([])
  const [absenId, setAbsenId] = useState("")
  const [dataCapture, setDataCapture] = useState(null)

  const getAbsenData = async () => {
    await fetch('/data-absen', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        // const dataAbsen = data.map((absen, i) => ({
        //   label: absen._id
        // }))
        setAbsenData(data)
      })
  }

  // const getIdAbsen = async (e) => {}
  

  const startAttendance = async (id, data) => {
    await fetch('/start-attendance/' + id , {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => console.log())
  }

  const startCamera = async (id) => {
    await fetch(`/start-attendance/${id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then( data => setDataCapture(data))
  }
  

  const onSubmit = async (data) => {
    id_absensi = data['dataAbsensi'][0]
    console.log("Id onSubmit ", id_absensi)
    startAttendance(id_absensi ,data)
    // stream = true
    startCamera(id_absensi)
    console.log("onSubmit ",data)
  }
  

  useEffect(() => {
    if (stream !== false){
      startCamera(id_absensi)
    }

    if (absenData !== []) {
      getAbsenData()
    }
  }, [dataCapture])

  console.log("Absen data ", absenData)
  console.log("Data Capture ", dataCapture)
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
              <Card maxWidth={600} >
                <CardMedia 
                  sx={{
                    height: 300
                  }}
                  image={dataCapture}
                />
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
                      sx={{py : 1}}
                    >
                      <FormControl variant="outlined" fullWidth >
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
                    <Button
                      type='submit'
                      color='primary'
                      variant='contained'
                    >
                      Mulai
                    </Button>
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
                  <Typography>Kelas : 4A</Typography>
                </Grid>
                <Grid 
                  item
                  lg={6}
                  sm={6}
                  xl={6}
                  xs={6}
                >
                  <Typography>Mata Kuliah</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid 
                container
              >
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
                </Table>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  )
}
export default Dashboard;