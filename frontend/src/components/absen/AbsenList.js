import React, { useState } from 'react'
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

const AbsenList = ({ dataAbsen, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('nim')

  
  return (
    <div>
      
    </div>
  )
}

export default AbsenList
