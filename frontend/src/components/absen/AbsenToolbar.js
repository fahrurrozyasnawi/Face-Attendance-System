import React, { useState } from 'react';
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


const AbsenToolbar = (props) => {
  const [open, setOpen] = useState(false);
  // const { searchTerm, onSearchChange} = props

  const handleClickOpen = () => {
    setOpen(true);  
  }
  const handleClose = () => {
    setOpen(false);
  }

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
                value={props.searchTerm}
                onChange={props.onSearchChange}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default AbsenToolbar
