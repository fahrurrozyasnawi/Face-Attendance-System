import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Avatar,
  Box,
  Card,
  Table,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

const DosenList = ({ dosens, ...rest }) => {
  const [selectedDosenIds, setSelectedDosenIds] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)

  const handleSelectAll = (e) => {
    let newSelectedDosenIds

    if (e.target.checked) {
      newSelectedDosenIds = dosens.map((dosen) => dosen.id)
    } else {
      newSelectedDosenIds = []
    }

    setSelectedDosenIds(newSelectedDosenIds)
  }

  const handleSelectOne = (e, id) => {
    const selectedIndex = selectedDosenIds.indexOf(id)
    let newSelectedDosenIds = []

    if (selectedIndex === -1) {
      newSelectedDosenIds = newSelectedDosenIds.concat(selectedDosenIds, id)
    } else if (selectedIndex === 0) {
      newSelectedDosenIds = newSelectedDosenIds.concat(selectedDosenIds.slice(1))
    } else if (selectedIndex = selectedDosenIds.length - 1) {
      newSelectedDosenIds = newSelectedDosenIds.concat(selectedDosenIds.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedDosenIds = newSelectedDosenIds.concat(
        selectedDosenIds.slice(0, selectedIndex),
        selectedDosenIds.slice(selectedIndex + 1)
      )
    }
    
    setSelectedDosenIds(newSelectedDosenIds)
  }

  const handelLimitChange = (e) => {
    setLimit(e.target.value)
  }
  
  const handlePageChange = (e, newPage) => {
    setPage(newPage)
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
                    checked={selectedDosenIds.length === dosens}
                    color='primary'
                    indeterminate={
                      selectedDosenIds.length > 0
                      && selectedDosenIds.length < dosens.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  NIP
                </TableCell>
                <TableCell>
                  Nama Lengkap
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
  )
}

DosenList.propTypes = {
  dosens: PropTypes.array.isRequired
}

export default DosenList
