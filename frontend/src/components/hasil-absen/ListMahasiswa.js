import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form';
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  Typography,
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  Button,
  Divider,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  Table,
  TablePagination,
  IconButton
} from '@material-ui/core'
import EnhancedTableHead from 'src/utils/EnhancedTableHead'
import EditIcon from '@material-ui/icons/Edit'
import EditStatusMahasiswa from './EditStatusMahasiswa';


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
  { id: 'status', label: 'Status' },
]

const ListMahasiswa = (props) => {
  const [dataList, setDataList] = useState([])
  const [dataAbsensi, setDataAbsensi] = useState([])
  const [idAbsensi, setIdAbsensi] = useState("")
  const [open, setOpen] = useState(false)
  const [nimMahasiswa, setNimMahasiswa] = useState("")
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('nim')
  const data = useParams()
  const id = data.id
  const navigate = useNavigate()

  console.log("history ", data)
  console.log("history ", id)


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const backToList = () => {
    navigate('..')
  }
  

  const handleLimitChange = (event) => {
    setLimit(+event.target.value)
    setPage(0)
  }

  const hanldePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }

  const getList = async () => {
   await fetch('/hasil/' + id, {
      method: 'GET'
    })
      .then(res => res.json())
      .then( data => {
        console.log("Data API ",data)
        setDataList([...data])
      })
  }

  const getDataAbsensi = (id) => {
    fetch(`/hasil-data-absensi/${id}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        setDataAbsensi([...data])
      })
  }

  const getIdAbsen = async (data) => {
    const id = await data.map((m, i) => {
      setIdAbsensi(m.kode_absensi)
    })
  }
  
  const getEditMahasiswa = (idMahasiswa) => {
    setNimMahasiswa(idMahasiswa)
    handleClickOpen()
  }
  

  console.log("id nim ", nimMahasiswa)
  useEffect( async () => {
    getList()
    getIdAbsen(dataList)
    await getDataAbsensi(idAbsensi)
  }, [dataList])
  
  return (
    <Box {...props}>
      <Box
        sx={{
          px: 2,
          py: 2
        }}
      >
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 1
          }}
        >
          <Container sx={{m: 2}}>
            <Button
              color='primary'
              variant='contained'
              onClick={ () => backToList() }
            >Kembali</Button>
          </Container>
          <Container>
            <Card>
              <CardContent>
                <Box>
                  {dataAbsensi.map((data) => {
                    return(
                  <Grid
                    container
                    sx={{ p: 1}}
                  >
                    <Grid 
                      item
                      lg={6}
                      sm={6}
                      xl={6}
                      sm={6}
                    >
                      <Typography>Dosen Pengajar : {data.namaDosen} </Typography>
                      <Typography>Kelas : {data.kelas} </Typography>
                    </Grid>
                    <Grid 
                      item
                      lg={6}
                      sm={6}
                      xl={6}
                      sm={6}
                    >
                      <Typography>Tahun Ajaran : {data.tahunAjaran} </Typography>
                      <Typography>Mata Kuliah : {data.mataKuliah} </Typography>
                    </Grid>
                  </Grid>
                  )
                  })}
                </Box>
              </CardContent>
            </Card>
          </Container>
          <Container 
            maxWidth
            sx={{ mt: 2 }}
          >
            <Card>
              <PerfectScrollbar>
                <CardContent>
                  <Grid sx={{ minWidth: 1050 }}>
                    <Table>
                      <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headCells={headCells}
                      />
                      {dataList.map((data, index) => {
                          return (
                          <TableBody key={index}>
                            {stableSort(data.mahasiswa, getComparator(order, orderBy))
                            .slice(page * limit, page * limit + limit)
                            .map((m, i) => (
                            <TableRow
                              hover
                              key={i}
                            >
                              <TableCell>{m.nim}</TableCell>
                              <TableCell>{m.namaLengkap}</TableCell>
                              <TableCell
                                // color={}
                              >{m.status}</TableCell>
                              <TableCell>
                                <IconButton
                                  variant="outlined"
                                  color="success"
                                  // onClick={(event) => getEditMahasiswa(m._id) }

                                >
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                              <EditStatusMahasiswa
                                id={idAbsensi} 
                                idMahasiswa={nimMahasiswa}
                                open={open}
                                handleClose={handleClose}
                              />
                            </TableRow>
                          ))}
                          </TableBody>)
                        })}
                    </Table>
                  </Grid>
                </CardContent>
              </PerfectScrollbar>
              <TablePagination 
                component="div"
                count={dataList.length}
                onPageChange={hanldePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default ListMahasiswa
