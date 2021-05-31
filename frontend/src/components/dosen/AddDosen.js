import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core'

const AddDosen = (props) => {
  const [dataDosen, setDataDosen] = useState([])

  const handleChange = (event) => {
    setDataDosen({
      ...dataDosen,
      [event.target.name] : event.target.value
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
          title='Tambah Dosen'
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
                label='Nama Dosen'
                name='namaDosen'
                onChange={handleChange} 
                required
                value={dataDosen.namaDosen}
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField 
                fullWidth
                label='NIP'
                name='nip'
                onChange={handleChange}
                required
                value={dataDosen.nip}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddDosen
