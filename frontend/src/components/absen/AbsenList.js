import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { green, red } from '@material-ui/core/colors';
import { Link, useNavigate } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useForm } from 'react-hook-form'
import {
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow
} from '@material-ui/core';
import groupBy from 'src/utils/groupBy'
import EnhancedTableHead from 'src/utils/EnhancedTableHead'
import EditAbsen from './EditAbsen'


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
  { id: 'mataKuliah', label: 'Mata Kuliah' },
  { id: 'namaDosen', label: 'Dosen Pengajar' },
  { id: 'kelas', label: 'Kelas' },
  { id: 'programStudi', label: 'Program Studi' }
]

const AbsenList = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('mataKuliah')
  const [open, setOpen] = useState(false)
  const [absenId, setAbsenId] = useState("")
  const [dataAbsen, setDataAbsen] = useState([])
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const handleLimitChange = (event) => {
    setLimit(+event.target.value)
    setPage(0)
  }

  const hanldePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const deleteAbsen = (id) => {
    // console.log("Id user ", id)
    const res = fetch('/absen/' + id, {
      method: 'DELETE'})
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const getAbsen = (id) => {
    setAbsenId(id)
    handleClickOpen()
  }

  const getDataAbsen = () => {
    fetch('/data-absen', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        // data = !props.searchTerm
        //   ? data
        //   : data.filter(person =>
        //       person.namaLengkap.toLowerCase().includes(props.searchTerm.toLowerCase()))
        setDataAbsen(data)
      })
    }
  useEffect(() =>{
    getDataAbsen()
  }, [])
  console.log("data absen list ", dataAbsen)
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
              {stableSort(dataAbsen, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((absen, index) => {
                  return(
                <TableRow
                  hover
                  key={absen._id}
                >
                  <TableCell>
                    {absen.mataKuliah}
                  </TableCell>
                  <TableCell>
                    {absen.namaDosen}
                  </TableCell>
                  <TableCell>
                    {absen.kelas}
                  </TableCell>
                  <TableCell>
                    {absen.programStudi}
                  </TableCell>
                  <TableCell>
                  {/* <Link to={`/admin/mahasiswa/${mahasiswa._id}`} >Edit</Link> */}
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={ () => getAbsen(absen._id) }
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => deleteAbsen(absen._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <EditAbsen
                    id={absen._id}
                    // mahasiswaData={mahasiswaData}
                    open={open}
                    handleClose={handleClose}
                  />
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination 
        component="div"
        count={dataAbsen.length}
        onPageChange={hanldePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  )
}

export default AbsenList
