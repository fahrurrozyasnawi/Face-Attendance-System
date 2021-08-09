import React, {useState} from 'react';
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
 
 const DosenToolbar = (props) => {
   const [open, setOpen] = useState(false);

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
          color="secondary"
          variant="contained"
          sx={{ mx: 1 }}>
          Hapus
        </Button>
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
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
   );
 };
 
 export default DosenToolbar;