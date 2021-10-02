import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  CardContent
} from '@material-ui/core'
import status from 'src/__mocks__/Status'

const EditStatusMahasiswa = (props) => {
  const nim = props.idMahasiswa
  const id = props.id
  const { register, handleSubmit } = useForm()
  const [type, setType] = useState()
  const [opensnackbar, setOpensnackbar] = useState(false)
  const [message, setMessage] = useState("")

  const msgSuccess = (msg = "Data berhasil diinput!", severity='success') => {
    setMessage(msg)
    setType(severity)
  }

  const msgError = (msg="Data sudah ada! Harap input data yang baru.", severity='error') => {
    setMessage(msg)
    setType(severity)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpensnackbar(false)
  }

  const updateStatusHadir = async (id, data) => {
   await fetch(`/hasil/${id}`, {
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
    console.log("Ubah data ", data)
    updateStatusHadir(id, data)
  }
  
  console.log("NIm ", nim)
  console.log("Id ", id)
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}>
      <DialogTitle onClose={props.handleClose} >Edit Status</DialogTitle>
      <DialogContent>
        <form
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
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
                  <FormControl variant="outlined" fullWidth >
                    <InputLabel id="label-prodi">Status</InputLabel>
                    <Select
                      {...register("status")}
                      fullWidth
                      labelId="label-prodi"
                      label="Program Studi"
                      // value={programStudi}
                    >
                      {status.map((option) => (
                        <MenuItem key={option.value} value={[option.value, nim]}>
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
                Ubah Status
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

export default EditStatusMahasiswa
