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
import AddMahasiswa from 'src/components/mahasiswa/AddMahasiswa';

const MahasiswaToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const { searchTerm, onSearchChange} = props

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
        Tambah Mahasiswa
      </Button>
    </Box>
    <Dialog
     open={open}
     onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>Tambah Data Mahasiswa</DialogTitle>
      <DialogContent>
        <AddMahasiswa />
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
              placeholder="Search Mahasiswa"
              variant="outlined"
              value={searchTerm}
              onChange={onSearchChange}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
  );
};

MahasiswaToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
}

export default MahasiswaToolbar;