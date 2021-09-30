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
  Typography,
  Divider
 } from '@material-ui/core';
import AddDosen from 'src/components/dosen/AddDosen';
import { Search as SearchIcon } from 'react-feather';
import { Dialog } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import DosenList from './DosenList';
 
 const DosenToolbar = (props) => {
   const [open, setOpen] = useState(false);
   const [dataDosen, setDataDosen] = useState([])
   const [searchTerm, setSearchTerm] = useState("")

   const handleClickOpen = () => {
     setOpen(true);
   }
   const handleClose = () => {
     setOpen(false);
   }

   const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  
  const getDataDosen = async () => {
    fetch('/data-dosen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        data = !searchTerm
          ? data
          : data.filter(person =>
              person.namaDosen.toLowerCase().includes(searchTerm.toLowerCase()))
        setDataDosen(data)
      })
    }

  useEffect(() => {
    getDataDosen()
  },[dataDosen,searchTerm])
   
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
          Tambah Dosen
        </Button>
        <Dialog
          onClose={handleClose}
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" onClose={handleClose} >
            <Typography variant="h3" >
              Tambah Dosen
            </Typography> 
          </DialogTitle>
          <Divider />
          <DialogContent id="alert-dialog-description" >
            <AddDosen />
          </DialogContent>
        </Dialog>
      </Box>
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
                placeholder="Search customer"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ pt: 3 }}>
        <DosenList dataDosen={dataDosen} />
      </Box>
    </Box>
   );
 };
 
 export default DosenToolbar;