import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import { useMatch } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  Typography,
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Table
} from '@material-ui/core'

const ListMahasiswa = (props) => {
  const [dataList, setDataList] = useState([])
  const { params : id } = useMatch('/hasil/:id')

  console.log("history ", id)

  const getList = async () => {
    await fetch('/hasil-absensi-realtime/', {
      method: 'GET'
    })
      .then(res => res.json())
      .then( data => {
        setDataList([...data])
      })
  }
  

  return (
    <div>
      
    </div>
  )
}

export default ListMahasiswa
