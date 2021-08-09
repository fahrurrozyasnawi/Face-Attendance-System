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
  TableRow
} from '@material-ui/core';


const MahasiswaList = ({ mahasiswas, ...rest}) => {
  const [selectedMahasiswaIds, setSelectedMahasiswaIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  
  const handleSelectAll = (e) => {
    let newSelectedMahasiswaIds;

    if (e.target.checked) {
      newSelectedMahasiswaIds = mahasiswas.map((mahasiswa) => mahasiswa.id);
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
                    // checked={selectedMahasiswaIds.length === mahasiswas.length}
                    // color='primary'
                    // indeterminate={
                    //   selectedMahasiswaIds.length > 0
                    //   && selectedMahasiswaIds.length < mahasiswas.length
                    // }
                    // onChange={handleSelectAll}
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
              {/* Use API python */}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

MahasiswaList.propTypes = {
  mahasiswas: PropTypes.array.isRequired
};

export default MahasiswaList;
