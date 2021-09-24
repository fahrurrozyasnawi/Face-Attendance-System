import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useForm} from 'react-hook-form'
import {
  Button,
  Box,
  Card,
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  DialogTitle,
  DialogContent,
  Dialog
} from '@material-ui/core';
import EnhancedTableHead from 'src//utils/EnhancedTableHead'
import EditDosen from 'src/components/dosen/EditDosen'

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
  { id: 'nip', label: 'NIP' },
  { id: 'namaDosen', label: 'Nama Dosen' },
  { id: 'programStudi', label: 'Program Studi' }
]

const DosenList = ({ dataDosen, ...rest }) => {
  const [selectedDosenIds, setSelectedDosenIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('nim')
  const [open, setOpen] = useState(false)
  const [dosenData, setDosenData] = useState([])

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

  const deleteDosen = (id) => {
    const res = fetch('/dosen/' + id, {
      method: 'DELETE'})
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const getDosen = (id) => {
    handleClickOpen()
    const res = fetch('/dosen/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => {
        setDosenData(json)
        // console.log("Ini data ",data)
        console.log("Ini mahasiswaData ",dosenData)
      })
  }


  const handelLimitChange = (event) => {
    setLimit(+event.target.value)
    setPage(0)
  }
  
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }
  
  
  return (
    <Card {...rest}>
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
            {stableSort(dataDosen, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((dosen, index) => {
                  return(
                <TableRow
                  hover
                  key={dosen._id}
                >
                  <TableCell>
                    {dosen.nip}
                  </TableCell>
                  <TableCell>
                    {dosen.namaDosen}
                  </TableCell>
                  <TableCell>
                    {dosen.programStudi}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={(event) => getDosen(dosen._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={(event) => deleteDosen(dosen._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <EditDosen 
                      id={dosen._id}
                      mahasiswaData={dosenData}
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
        count={dataDosen.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handelLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Card>
  );
};

DosenList.propTypes = {
  dataDosen: PropTypes.array.isRequired
};

export default DosenList;
