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
  FormControl,
  Dialog,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import angkatan from './List/Angkatan';
import prodi from './List/Prodi'
import { Select } from '@material-ui/core';

const EditMahasiswa = (props) => {
  const { id,  open, handleClose } = props
  const { 
    register, handleSubmit, reset, setValue, getValues, errors, formState 
  } = useForm()
  const [message, setMessage] = useState("")
  const [type, setType] = useState()
  const [opensnackbar, setOpensnackbar] = useState(false)
  const [mahasiswaData, setMahasiswaData] = useState({})
  

  const msgSuccess = (msg = "Data berhasil diinput!", severity='success') => {
    setMessage(msg)
    setType(severity)
  }

  const msgError = (msg="Data sudah ada! Harap input data yang baru.", severity='error') => {
    setMessage(msg)
    setType(severity)
  }

  const handleClick = () => {
    setOpensnackbar(true)
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpensnackbar(false)
  }
  
  const updateMahasiswa = (id, data) => {
    fetch('/mahasiswa/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        msgSuccess()
      })
      .catch( err => msgError())
  }

  const onSubmit = async (data) => {
    console.log("id dari onSubmit = ", id)
    updateMahasiswa(id, data)
  }
  
  useEffect( () => {
    fetch('/mahasiswa/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(mahasiswaData => {
          // setMahasiswaData(json)
          const fields = ['namaLengkap', 'nim', 'kelas', 'angkatan', 'programStudi']
          console.log("Fields = ", fields)
          fields.forEach(field => setValue(field, mahasiswaData[field]))
          setMahasiswaData(mahasiswaData)
          console.log("SetValue data = ", mahasiswaData)
        })
  })

  console.log("Edit mahasiswa data from mahasiswaData = ",mahasiswaData)
  // console.log("Nilai setValue = ", setValue())
  return (
    <Dialog
      // {...rest}
      open={open}
      onClose={handleClose}>
      <DialogTitle onClose={handleClose} >Edit Mahasiswa</DialogTitle>
      <DialogContent>
        <form
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
          onReset={reset}
          // onChange={getOneMahasiswaData}
          // noValidate
          // {...props} 
        >
          <Card>
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    {...register("namaLengkap")}
                    // ref={register}
                    fullWidth
                    helperText="Isi nama lengkap mahasiswa"
                    label='Nama Lengkap'
                    required
                    // defaultValue={mahasiswaData.namaLengkap}
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
                Ubah
              </Button>
            </Box>
            <Snackbar
              sx={{
                justifyContent: 'center'
              }}
              open={opensnackbar} 
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

EditMahasiswa.propTypes = {
  id: PropTypes.string.isRequired,
  // mahasiswaData: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default EditMahasiswa
