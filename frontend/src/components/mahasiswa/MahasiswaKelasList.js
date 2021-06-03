import React from 'react'
import PropTypes from 'proptypes'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

const MahasiswaKelasList = ({ kelass, ...rest }) => {
  const [selectedKelasIds, setSelectedKelasIds] = useState([])
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(0)


  const handleSelectAll = (event) => {
    let newSelectedKelasIds
    
    if (event.target.checked) {
      newSelectedKelasIds = kelass.map((kelas) => kelas.id)
    } else {
      newSelectedKelasIds = []
    }

    setSelectedKelasIds(newSelectedKelasIds)
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedKelasIds.indexOf(id)
    let newSelectedKelasIds = []

    if (selectedIndex === -1) {
      newSelectedKelasIds = newSelectedKelasIds.concat(selectedKelasIds, id)
    } else if (selectedIndex === 0) {
      newSelectedKelasIds = newSelectedKelasIds.concat(selectedKelasIds.slice(1))
    } else if (selectedIndex === selectedKelasIds.lenght - 1) {
      newSelectedKelasIds = newSelectedKelasIds.concat(selectedKelasIds.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedKelasIds = newSelectedKelasIds.concat(
        selectedKelasIds.slice(0, selectedIndex),
        selectedKelasIds.slice(selectedIndex + 1)
      )
    }

    setSelectedKelasIds(newSelectedKelasIds)
  }
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value)
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }
  
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box>
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
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

export default MahasiswaKelasList