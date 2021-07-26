import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
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
  const { register, handleSubmit } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <form
      autoComplete='off'
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        {/* <CardHeader
          title='Tambah Dosen'
        />
        <Divider /> */}
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
                {...register("namaDosen")}
                fullWidth
                size="small"
                label='Nama Dosen'
                required
                variant='outlined'
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField 
                {...register("nip")}
                fullWidth
                size="small"
                label='NIP'
                type="number"
                required
                variant='outlined'  
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField 
                {...register("prodi")}
                fullWidth
                size="small"
                label='Program Studi'
                required
                variant='outlined'  
              />
            </Grid>
            <Grid
              item
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddDosen
