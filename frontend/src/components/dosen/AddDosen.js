import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Alert,
  CardContent,
  Snackbar,
  InputLabel,
  Grid,
  MenuItem,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';
import prodi from 'src/components/mahasiswa/List/Prodi'

const AddDosen = (props) => {
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

  const onSubmit = (data, e) => {
    e.preventDefault()
    fetch('/data-dosen', {
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
      {...props}
    >
      <Card>
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
                >
                  {prodi.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >Simpan
              </Button>
            </Grid>
          </Grid>
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
        </CardContent>
      </Card>
    </form>
  );
};

export default AddDosen;
