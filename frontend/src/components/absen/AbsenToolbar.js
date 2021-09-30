import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  DialogTitle,
  Dialog
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { DialogContent } from '@material-ui/core';
import AddAbsen from 'src/components/absen/AddAbsen'
import AbsenList from './AbsenList';


const AbsenToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [dataAbsen, setDataAbsen] = useState([])
  // const { searchTerm, onSearchChange} = props

  const handleClickOpen = () => {
    setOpen(true);  
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const getDataAbsen = () => {
    fetch('/data-absen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("ini data ", data)
        data = !props.searchTerm
          ? data
          : data.filter(person =>
              person.namaDosen.toLowerCase().includes(props.searchTerm.toLowerCase()))
        setDataAbsen(data)
      })
    }
  useEffect(() => {
    getDataAbsen()
  },[dataAbsen,searchTerm])

  console.log("data absen list ", dataAbsen)

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Tambah Absensi
        </Button>
      </Box>
      <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      >
        <DialogTitle onClose={handleClose}>Tambah Data Absensi</DialogTitle>
        <DialogContent>
          <AddAbsen />
        </DialogContent>
      </Dialog>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Absen"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{pt: 3 }} >
        <AbsenList dataAbsen={dataAbsen} />
      </Box>
    </Box>
  )
}

export default AbsenToolbar
