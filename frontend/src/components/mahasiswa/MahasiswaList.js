import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import groupBy from 'src/utils/groupBy'
import EnhancedTableHead from 'src/utils/EnhancedTableHead'

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

const MahasiswaList = ({ dataMahasiswa, ...rest}) => {
  const [selectedMahasiswaIds, setSelectedMahasiswaIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('kelas')
  const [searchTerm, setSearchTerm] = useState("")

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
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

  const isSelected = (_id) => selectedMahasiswaIds.indexOf(_id) !== -1
  // const emptyRows = rowsPerPage - Math.min(limit, dataMahasiswa.length - page * limit)

  const dataPerKelas = groupBy(dataMahasiswa, 'kelas')
  console.log(dataPerKelas)
  // const dataPerProdi = groupBy(dataPerKelas, 'programStudi')
  // console.log(dataPerProdi)
  
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }} >
          <Table>
            {/* <TableHead>
              <TableRow>
                <TableCell padding='checkbox' >
                  <Checkbox 
                    checked={selectedMahasiswaIds.length === dataMahasiswa.length}
                    color='primary'
                    indeterminate={
                      selectedMahasiswaIds.length > 0
                      && selectedMahasiswaIds.length < dataMahasiswa.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  NIM
                </TableCell>
                <TableCell>
                  Nama Lengkap
                </TableCell>
                <TableCell>
                  Kelas
                </TableCell>
                <TableCell>
                  Angkatan
                </TableCell>
                <TableCell>
                  Program Studi
                </TableCell>
                <TableCell>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead> */}
            <EnhancedTableHead 
              numSelected={selectedMahasiswaIds.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAll}
              onRequestSort={handleRequestSort}
              rowCount={dataMahasiswa.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(dataMahasiswa, getComparator(order, orderBy))
                .slice(page * limit, page * limit + limit)
                .map((mahasiswa, index) => {
                  const itemIsSelected = isSelected(mahasiswa._id)
                  const labelId = 'enhanced-table-checkbox-${index}'

                  return(
                <TableRow
                  hover
                  key={mahasiswa._id}
                  selected={selectedMahasiswaIds.indexOf(mahasiswa._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMahasiswaIds.indexOf(mahasiswa._id) !== -1}
                      onChange={(event) => handleSelectOne(event, mahasiswa._id)}
                    />
                  </TableCell>
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
                    Tes
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
    </Card>
  );
};

MahasiswaList.propTypes = {
  dataMahasiswa: PropTypes.array.isRequired
};

export default MahasiswaList;
