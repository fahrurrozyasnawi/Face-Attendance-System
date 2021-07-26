import React from 'react'
import {useForm} from 'react-hook-form'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  Divider,
  Grid,
  MenuItem,
  TextField,
  FormControl
} from '@material-ui/core'
import angkatan from './List/Angkatan'
import { Select } from '@material-ui/core'

const AddMahasiswa = (props) => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data, e) => {
    e.preventDefault()
    // fetch()
  }
  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      // noValidate
      {...props}
    >
      <Card>
        {/* <CardHeader
          title='Tambah Mahasiswa'
        /> */}
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
              <TextField
                {...register("programStudi")} 
                fullWidth
                label='Program Studi'
                required
                variant='outlined'
              />
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
      </Card>
    </form>
  )
}

export default AddMahasiswa
