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

const HasilAbsensiToolbar = (props) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dataHasilAbsensi, setDataHasilAbsensi] = useState([])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const getDataHasilAbsen = () => {
    
  }
  

  return (
    <div>
      
    </div>
  )
}

export default HasilAbsensiToolbar
