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


const MahasiswaList = ({ dataMahasiswa, ...rest}) => {
  const [selectedMahasiswaIds, setSelectedMahasiswaIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  const handleSelectAll = (e) => {
    let newSelectedMahasiswaIds;

    if (e.target.checked) {
      newSelectedMahasiswaIds = dataMahasiswa.map((mahasiswa) => mahasiswa.id);
    } else {
      newSelectedMahasiswaIds = [];
    }
    
    setSelectedMahasiswaIds(newSelectedMahasiswaIds);
  }
  
  const handleSelectOne = (e, id) => {
    const selectedIndex = selectedMahasiswaIds.indexOf(id);
    let newSelectedMahasiswaIds = [];

    if (selectedIndex === -1) {
      newSelectedMahasiswaIds = newSelectedMahasiswaIds.concat(selectedMahasiswaIds, id);
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
    setLimit(event.target.value);
  }

  const hanldePageChange = (event, newPage) => {
    setPage(newPage);
  }
  
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }} >
          <Table>
            <TableHead>
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
            </TableHead>
            <TableBody>
              {dataMahasiswa.map((mahasiswa) => (
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
              ))}
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
