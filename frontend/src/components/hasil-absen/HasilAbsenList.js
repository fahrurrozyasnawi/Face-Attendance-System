import React, { useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  IconButton
} from '@material-ui/core';
import groupBy from 'src/utils/groupBy'
import EnhancedTableHead from 'src/utils/EnhancedTableHead'
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete'
import ListMahasiswa from './ListMahasiswa'

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]){
    return -1
  }
  if (b[orderBy] > a[orderBy]){
    return 1
  }
  return 0
}

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a,b) => descendingComparator(a, b, orderBy)  
    : (a,b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a,b) => {
    const order = comparator(a[0], b[0])
    if ( order !== 0) return order
    return a[1] - b[1]
  }) 
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: 'kode_absensi', label: 'Kode Absensi' },
  { id: 'tglAbsensi', label: 'Tanggal Absensi' },
  { id: 'waktuAbsensi', label: 'Waktu Absensi' },
]

const HasilAbsenList = (props, {datas}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('tglAbsensi')
  const [open, setOpen] = useState(false)
  const [dataHasil, setDataHasil] = useState([])
  const [idHasilAbsensi, setIdHasilAbsensi] = useState("")
  const history = useNavigate()

  const navigate = (id) => {
    history(`../${id}`)
  }
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const deleteHasil = (id) => {
    
  }
  
  // const getHasil = (id) => {
  //   let idHasil = id
  // }

  const handleLimitChange = (event) => {
    setLimit(+event.target.value)
    setPage(0)
  }

  const hanldePageChange = (event, newPage) => {
    setPage(newPage);
  }

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }} >
          <Table>
            <EnhancedTableHead 
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(props.dataHasil, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((mahasiswa, index) => {
                  return(
                <TableRow
                  hover
                  key={mahasiswa._id}
                >
                  <TableCell>
                    {mahasiswa.kode_absensi}
                  </TableCell>
                  <TableCell>
                    {mahasiswa.tglAbsensi}
                  </TableCell>
                  <TableCell>
                    {mahasiswa.waktuAbsensi}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      variant="outlined"
                      color="success"
                      onClick={ () => navigate(mahasiswa._id) }
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      variant="outlined"
                      onClick={(event) => deleteHasil(mahasiswa._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination 
        component="div"
        count={props.dataHasil.length}
        onPageChange={hanldePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  )
}

export default HasilAbsenList
