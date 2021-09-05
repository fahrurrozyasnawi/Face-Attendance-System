import React, { useEffect, useState } from 'react'
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
  FormControl
} from '@material-ui/core';
import angkatan from './List/Angkatan';
import prodi from './List/Prodi'
import { Select } from '@material-ui/core';

const EditMahasiswa = (props) => {
  const { id, mahasiswaData} = props
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState()

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

  console.log("Ini id = ",id)
  
  // console.log(getMahasiswa())
  console.log("Ini data Mahasiswa = ",mahasiswaData)
  // console.log("Ini dari setMahasiswaData = ", setMahasiswaData())

  const onSubmit = async (data,event) => {
    console.log("id dari onSubmit = ", id)
    // event.preventDefault()
    const response = await fetch('/mahasiswa/' + id, {
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
        console.log(handleSubmit())
        console.log("Data json = ", data)
      })
      .catch( err => {
        handleClick()
        msgError()
      })
      // data = await res.json()
      // console.log("data form Edit = ",res)
  }
  
  console.log("Data Mahasiswa = ", handleSubmit())

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      // noValidate
      {...props}
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
                // value={mahasiswanamaLengkap}
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
                // value={nim}
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
                // value={kelas}
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
                  // value={dataAngkatan}
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
                  // value={programStudi}
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

// EditMahasiswa.propTypes = {
//   mahasiswaData: PropTypes.array.isRequired,
//   id: PropTypes.string.isRequired
// };

export default EditMahasiswa
