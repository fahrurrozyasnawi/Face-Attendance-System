import React, { useState } from 'react'
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
  Select,
  FormControl
} from '@material-ui/core';
import angkatan from './List/Angkatan';
import prodi from './List/Prodi'

const AddKelas = (props) => {
  const { register, handleSubmit } = useForm()
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

  const onSubmit = async (data, e) => {
    e.preventDefault()
    const response = await fetch('/data-mahasiswa', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        handleSubmit()
        handleClick()
        msgSuccess()
        console.log(message)
      })
      .catch( err => {
        console.log(message)
        handleClick()
        msgError()
      })
      console.log(data)
  }

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

export default AddKelas
