import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
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
  // const nim = props.idMahasiswa
  // const id = props.id
  const [type, setType] = useState()
  const [opensnackbar, setOpensnackbar] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const id = useParams().id
  const data = useLocation().state
  const nim = data.idMahasiswa
  const current_status = data.status
  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: current_status
    }
  })

  console.log("Data id ", id)
  console.log("Data nim ", nim)
  console.log("Data status ", current_status)

  const msgSuccess = (msg = "Data berhasil diubah!", severity='success') => {
    setMessage(msg)
    setType(severity)
  }

  const msgError = (msg="Gagal mengubah status", severity='error') => {
    setMessage(msg)
    setType(severity)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway'){
      return
    }
    setOpensnackbar(false)
  }

  const buttonBack = () => {
    navigate(`/admin/hasil/${id}`)
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
        buttonBack()
      })
      .catch( err => msgError())
  }

  const onSubmit = async (data) => {
    console.log("Ubah data ", data)
    updateStatusHadir(id, data)
  }
  
  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card
        sx={{ maxWidth: 350 }}
      >
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}>
            <Grid
              item
              lg={12}
              sm={12}
              md={12}
              xs={12}
            >
              <FormControl variant="outlined" fullWidth >
                <InputLabel id="label-prodi">Status</InputLabel>
                <Select
                  {...register("status")}
                  fullWidth
                  labelId="label-prodi"
                  label="Status"
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
            // onClick={() => navigate('..') }
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
  )
}

export default EditStatusMahasiswa
