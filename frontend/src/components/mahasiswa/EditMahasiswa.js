import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form';
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
  FormControl
} from '@material-ui/core';
import angkatan from './List/Angkatan';
import prodi from './List/Prodi'
import { Select } from '@material-ui/core';

const EditMahasiswa = ({...rest}) => {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState()
  const [mahasiswaData, setMahasiswaData] = useState([])

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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpen(false)
  }
  
  const onUpdate = async (data,id,e) => {
    e.preventDefault()
    const res = await fetch('/mahasiswa/${id}', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        handleSubmit()
        handleClick()
        msgSuccess()
        console.log(json)
      })
      .catch( err => {
        handleClick()
        msgError()
      })
      // data = await res.json()
      console.log("data form Edit = ",res)
  }
  
  // console.log("Data getValues = ", getValues)

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onUpdate)}
      // noValidate
      {...rest}
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
              <TextField
                {...register("namaLengkap")} 
                fullWidth
                helperText="Isi nama lengkap mahasiswa"
                label='Nama Lengkap'
                required
                // value={getValues["namaLengkap"]}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                {...register("nim")} 
                fullWidth
                label='NIM'
                required
                // value={getValues.nim}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField 
                {...register("kelas")}
                fullWidth
                label='Kelas'
                required
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <FormControl variant="outlined" fullWidth >
                <InputLabel id="label-angkatan">Angkatan</InputLabel>
                <Select
                  {...register("angkatan")}
                  labelId="label-angkatan"
                  label="Angkatan"
                >
                  {angkatan.map((option) => (
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
            Simpan
          </Button>
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
      </Card>
    </form>
  )
}

export default EditMahasiswa
