import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Card,
  Alert,
  CardContent,
  Snackbar,
  InputLabel,
  Divider,
  Grid,
  MenuItem,
  TextField,
  FormControl,
  Dialog,
  Select,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import prodi from 'src/components/mahasiswa/List/Prodi'
import kelas from 'src/__mocks__/Kelas'
import matkul from 'src/__mocks__/Matkul'
import tAjar from 'src/__mocks__/TahunAjaran'
import groupBy from 'src/utils/groupBy'

const EditAbsen = (props) => {
  const id = props.id
  const { 
    register, handleSubmit, reset, setValue, getValues, errors, formState 
  } = useForm()
  const [message, setMessage] = useState("")
  const [type, setType] = useState()
  const [open, setOpen] = useState(false)
  const [dataAbsen, setDataAbsen] = useState({})
  const [dosenData, setDosenData] = useState([])

  // Get dosen data for select form
  const getDataDosen = () => {
    fetch('/data-dosen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const dataDosen = data.map((dosen, i) => ({
          label: dosen.namaDosen,
          value: [dosen.namaDosen, dosen.nip]
        }))
        setDosenData(dataDosen)
      })
  }

  const msgSuccess = (msg = "Data berhasil diinput!", severity='success') => {
    setMessage(msg)
    setType(severity)
  }

  const msgError = (msg="Data sudah ada! Harap input data yang baru.", severity='error') => {
    setMessage(msg)
    setType(severity)
  }

  const handleClick = () => {
    setOpen(true)
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false)
  }

  const getOneAbsen = () => {
    fetch(`/absen/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(dataAbsen => {
        const fields = ['namaDosen', 'tahunAjaran', 'mataKuliah', 'kelas', 'programStudi']
        console.log("Fields = ", fields)
        fields.forEach(field => setValue(field, dataAbsen[field]))
        setDataAbsen(dataAbsen)
      })
  }

  useEffect(() => {
    getDataDosen()
    getOneAbsen()
  }, [])
  

  const updateAbsen = async (data) => {
    await fetch(`/absen/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Update ", data)
        handleClick()
        msgSuccess()
      })
      .catch(err => {
        handleClick()
        msgError()
      })
  }
  console.log("dataAbsen ", dataAbsen)
  console.log("Dosen data ", dosenData)
  return (
    <Dialog
      // {...props}
      fullWidth
      open={props.open}
      onClose={props.handleClose}>
      <DialogTitle onClose={props.handleClose} >Edit Absen</DialogTitle>
      <DialogContent>
        <form
          autoComplete='off'
          onSubmit={handleSubmit(updateAbsen)}
          onReset={reset}
          // noValidate
        >
          <Card>
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="label-angkatan">Dosen</InputLabel>
                    <Select
                      {...register("namaDosen")}
                      labelId="label-angkatan"
                      label="Angkatan"
                    >
                      {dosenData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="label-angkatan">Tahun Ajaran</InputLabel>
                    <Select
                      {...register("tahunAjaran")}
                      labelId="label-angkatan"
                      label="Tahun Ajaran"
                    >
                      {tAjar.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="label-angkatan">Mata Kuliah</InputLabel>
                    <Select
                      {...register("mataKuliah")}
                      labelId="label-angkatan"
                      label="Mata Kuliah"
                    >
                      {matkul.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="label-angkatan">Kelas</InputLabel>
                    <Select
                      {...register("kelas")}
                      labelId="label-angkatan"
                      label="Kelas"
                    >
                      {kelas.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="label-prodi">Program Studi</InputLabel>
                    <Select
                      {...register("programStudi")}
                      labelId="label-prodi"
                      label="Program Studi"
                    >
                      {prodi.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                type="submit"
                color='primary'
                variant='contained'
              >
                Ubah Data
              </Button>
            </Box>
            <Snackbar
              sx={{
                justifyContent: 'center'
              }}
              open={open} 
              autoHideDuration={6000} 
              onClose={handleCloseSnackbar}
              // message="I love snacks"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
            >
              <Alert onClose={handleCloseSnackbar} severity={type} >
                {message}
              </Alert>
            </Snackbar>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditAbsen
