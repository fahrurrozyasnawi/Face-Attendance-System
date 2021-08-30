import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
// import groupBy from 'src/utils/groupBy'
// kelass, ...rest 
const MahasiswaKelasList = ({ dataKelas, ...rest}) => {
  const [selectedKelasIds, setSelectedKelasIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [mahasiswa, setMahasiswa] = useState([])

  const handleSelectAll = (event) => {
    let newSelectedKelasIds;
    
    if (event.target.checked) {
      newSelectedKelasIds = dataKelas.map((kelas) => kelas.id);
    } else {
      newSelectedKelasIds = [];
    }

    setSelectedKelasIds(newSelectedKelasIds);
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedKelasIds.indexOf(id);
    let newSelectedKelasIds = [];

    if (selectedIndex === -1) {
      newSelectedKelasIds = newSelectedKelasIds.concat(selectedKelasIds, id);
    } else if (selectedIndex === 0) {
      newSelectedKelasIds = newSelectedKelasIds.concat(selectedKelasIds.slice(1));
    } else if (selectedIndex === selectedKelasIds.lenght - 1) {
      newSelectedKelasIds = newSelectedKelasIds.concat(selectedKelasIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedKelasIds = newSelectedKelasIds.concat(
        selectedKelasIds.slice(0, selectedIndex),
        selectedKelasIds.slice(selectedIndex + 1)
      );
    }

    setSelectedKelasIds(newSelectedKelasIds);
  }
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }
  
  return (
    <Card 
    {...rest}
    >
      <PerfectScrollbar>
        <Box
          sx={{ minWidth: 1050 }}
        >
          <Table>
            <TableHead>
              <TableRow>
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
              {/* API Data Kelas */}
              {dataKelas.slice(0, limit).map(kelas =>(
                <TableRow>
                  <TableCell>
                    <Box>
                      {kelas}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {/* <TablePagination 
        component="div"
        count={dataKelas.lenght}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 15]}
      /> */}
    </Card>
  );
};

MahasiswaKelasList.propTypes = {
  dataKelas: PropTypes.array.isRequired
};


export default MahasiswaKelasList;
