import React, { useEffect, useState } from 'react';
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
import prodi from 'src/components/mahasiswa/List/Prodi'
import kelas from 'src/__mocks__/Kelas'
import matkul from 'src/__mocks__/Matkul'
import tAjar from 'src/__mocks__/TahunAjaran'
import groupBy from 'src/utils/groupBy'

const AddAbsen = (props) => {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [type, setType] = useState()
  const [value, setValue] = useState("Tes")
  const [dosenData, setDosenData] = useState([])
  const [mahasiswaData, setMahasiswaData] = useState([])

  // GET Data from Mahasiswa and Dosen

  const getDataDosen = () => {
    fetch('/data-dosen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const dataDosen = data.map((dosen, i) => ({
          label: dosen.namaDosen,
          value: [dosen.namaDosen, dosen.nip]
        }))
        setDosenData(dataDosen)
      })
  }

  const getDataMahasiswa = () => {
    fetch('/data-mahasiswa', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        // const dataMahasiswa = data.map((mahasiswa) => ({
        //   label: mahasiswa.kelas,
        //   value: {

        //   }
        // }))
        setMahasiswaData(data)
      })
  }
  
  useEffect(() => {
    getDataMahasiswa()
    getDataDosen()
  },[])

  console.log("Mahasiswa = ", mahasiswaData)
  console.log("Dosen = ", dosenData)
  //Make dropdown list
  const byKelas = groupBy(mahasiswaData, 'kelas')
  console.log("Group Kelas ",byKelas)
  
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
    const response = await fetch('/data-absen', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
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
              <FormControl variant="outlined" fullWidth >
                <InputLabel id="label-angkatan">Dosen</InputLabel>
                <Select
                  {...register("namaDosen")}
                  labelId="label-angkatan"
                  label="Angkatan"
                >
                  {dosenData.map((option) => (
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
                <InputLabel id="label-angkatan">Tahun Ajaran</InputLabel>
                <Select
                  {...register("tahunAjaran")}
                  labelId="label-angkatan"
                  label="Tahun Ajaran"
                >
                  {tAjar.map((option) => (
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
                <InputLabel id="label-angkatan">Mata Kuliah</InputLabel>
                <Select
                  {...register("mataKuliah")}
                  labelId="label-angkatan"
                  label="Mata Kuliah"
                >
                  {matkul.map((option) => (
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
                <InputLabel id="label-angkatan">Kelas</InputLabel>
                <Select
                  {...register("kelas")}
                  labelId="label-angkatan"
                  label="Kelas"
                >
                  {kelas.map((option) => (
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

export default AddAbsen
