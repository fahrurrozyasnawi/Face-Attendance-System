import React, { useState } from 'react'
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
  DialogTitle,
  DialogContent,
  Dialog,
  FormControl
} from '@material-ui/core';
import prodi from 'src/components/mahasiswa/List/Prodi'
import { Select } from '@material-ui/core';


const EditDosen = (props) => {
  const { id, dosenData, open, handleClose } = props
  const { register, handleSubmit } = useForm();
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

  const onSubmit = async (data) => {
    const response = await fetch('/dosen/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        handleClick()
        msgSuccess()
        
      })
      .catch( err => {
        handleClick()
        msgError()
      })
  }

  return (
    <Dialog
      {...props}
      open={open}
      onClose={handleClose}>
      <DialogTitle onClose={handleClose} >Edit Dosen</DialogTitle>
      <DialogContent>
      <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
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
              <TextField
                {...register("namaDosen")}
                fullWidth
                size="small"
                label='Nama Dosen'
                required
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField 
                {...register("nip")}
                fullWidth
                size="small"
                label='NIP'
                type="number"
                required
                variant='outlined'  
              />
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
            Ubah Data
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
      </DialogContent>
    </Dialog>
  )
}

export default EditDosen
