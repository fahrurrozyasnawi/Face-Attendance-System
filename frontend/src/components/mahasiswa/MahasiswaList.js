import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { green, red } from '@material-ui/core/colors';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useForm} from 'react-hook-form';
import {
  Button,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  DialogTitle,
  Dialog,
  DialogContent,
  Hidden
} from '@material-ui/core';
import groupBy from 'src/utils/groupBy'
import EnhancedTableHead from 'src/utils/EnhancedTableHead'
import EditMahasiswa from 'src/components/mahasiswa/EditMahasiswa'

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
  { id: 'nim', label: 'NIM' },
  { id: 'namaLengkap', label: 'Nama Lengkap' },
  { id: 'kelas', label: 'Kelas' },
  { id: 'angkatan', label: 'Angkatan' },
  { id: 'programStudi', label: 'Program Studi' }
]

const MahasiswaList = ({ dataMahasiswa, deleteMahasiswa, ...rest}) => {
  const [selectedMahasiswaIds, setSelectedMahasiswaIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('nim')
  const [open, setOpen] = useState(false)
  const { getValues } = useForm()

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
  
  
  const handleSelectAll = (event) => {
    let newSelectedMahasiswaIds;

    if (event.target.checked) {
      newSelectedMahasiswaIds = dataMahasiswa.map((mahasiswa) => mahasiswa._id);
    } else {
      newSelectedMahasiswaIds = [];
    }
    
    setSelectedMahasiswaIds(newSelectedMahasiswaIds);
  }
  
  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedMahasiswaIds.indexOf(_id);
    let newSelectedMahasiswaIds = [];

    if (selectedIndex === -1) {
      newSelectedMahasiswaIds = newSelectedMahasiswaIds.concat(selectedMahasiswaIds, _id);
    } else if (selectedIndex === 0) {
      newSelectedMahasiswaIds = newSelectedMahasiswaIds.concat(selectedMahasiswaIds.slice(1));
    } else if (selectedIndex === selectedMahasiswaIds.length - 1) {
      newSelectedMahasiswaIds = newSelectedMahasiswaIds.concat(selectedMahasiswaIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMahasiswaIds = newSelectedMahasiswaIds.concat(
        selectedMahasiswaIds.slice(0, selectedIndex),
        selectedMahasiswaIds.slice(selectedIndex + 1)
      );
    }

    setSelectedMahasiswaIds(newSelectedMahasiswaIds);
  }
  
  const handleLimitChange = (event) => {
    setLimit(+event.target.value)
    setPage(0)
  }

  const hanldePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const dataPerKelas = groupBy(dataMahasiswa, 'kelas')
  // console.log(dataPerKelas)
  // const dataPerProdi = groupBy(dataPerKelas, 'programStudi')
  // console.log(dataPerProdi)
  
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
              {stableSort(dataMahasiswa, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((mahasiswa, index) => {
                  return(
                <TableRow
                  hover
                  key={mahasiswa._id}
                >
                  <TableCell>
                    {mahasiswa.nim}
                  </TableCell>
                  <TableCell>
                    {mahasiswa.namaLengkap}
                  </TableCell>
                  <TableCell>
                    {mahasiswa.kelas}
                  </TableCell>
                  <TableCell>
                    {mahasiswa.angkatan}
                  </TableCell>
                  <TableCell>
                    {mahasiswa.programStudi}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={handleClickOpen}
                    >
                      Edit
                    </Button>
                    <Button
                      // sx={{
                      //   // color: red[500],
                      //   backgroundColor: red[400],
                      //   '&:hover': {
                      //     backgroundColor: red[700],
                      //   },
                      //   }}
                      color="secondary"
                      variant="outlined"
                      onClick={(event) => deleteMahasiswa(mahasiswa._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination 
        component="div"
        count={dataMahasiswa.length}
        onPageChange={hanldePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle onClose={handleClose} >Edit Mahasiswa</DialogTitle>
        <DialogContent>
          <EditMahasiswa />
        </DialogContent>
      </Dialog>
    </Card>
  )
};

MahasiswaList.propTypes = {
  dataMahasiswa: PropTypes.array.isRequired
};

export default MahasiswaList;
