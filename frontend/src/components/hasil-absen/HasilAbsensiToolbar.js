import React, { useState, useEffect} from 'react'
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
import HasilAbsenList from './HasilAbsenList'

const HasilAbsensiToolbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dataHasilAbsensi, setDataHasilAbsensi] = useState([])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const getDataHasilAbsen = () => {
    fetch('/hasil', {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        data = !searchTerm
          ? data
          : data.filter(person => 
              person.kode_absensi.toLowerCase().includes(searchTerm.toLowerCase()))
        setDataHasilAbsensi(data)
      })
  }

  useEffect( () => {
    getDataHasilAbsen()
  }, [dataHasilAbsensi, searchTerm])
  


  return (
    <Box {...props}>
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
              placeholder="Search Hasil"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
    <Box sx={{pt: 3 }} >
      {/* List */}
      <HasilAbsenList dataHasil={dataHasilAbsensi} />
    </Box>
</Box>
  )
}

export default HasilAbsensiToolbar
