import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  MenuItem,
  TextField
} from '@material-ui/core'
import angkatan from './List/angkatan'

const AddMahasiswa = (props) => {
  const [dataMahasiswa, setDataMahasiswa] = useState([])

  const handleChange = (event) => {
    setDataMahasiswa({
      ...dataMahasiswa,
      [event.target.name]: event.target.value
    })
  }
  
  return (
    <form
      autoComplete='off'
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          title='Tambah Mahasiswa'
        />
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
                fullWidth
                helperText="Isi nama lengkap mahasiswa"
                label='Nama Lengkap'
                name='namaLengkap'
                onChange={handleChange}
                required
                value={dataMahasiswa.namaLengkap}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField 
                fullWidth
                helperText="Isi NIM mahasiswa"
                label='NIM'
                name='nim'
                onChange={handleChange}
                required
                value={dataMahasiswa.nim}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField 
                fullWidth
                label='Kelas'
                name='kelas'
                onChange={handleChange}
                required
                value={dataMahasiswa.kelas}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField 
                fullWidth
                label='Angkatan'
                name='angkatan'
                onChange={handleChange}
                required
                value={dataMahasiswa.angkatan}
                variant='outlined'
              >
                {angkatan.map((option) => (
                  <MenuItem key={option.value} value={option.value} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField 
                fullWidth
                label='Program Studi'
                name='programStudi'
                onChange={handleChange}
                required
                value={dataMahasiswa.programStudi}
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
