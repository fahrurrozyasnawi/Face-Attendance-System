import React, { useState, useEffect } from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  // const { dataMahasiswa, searchTerm, handleSearch } = props
  // const [searchTerm, setSearchTerm] = useState("")
  // const [dataMahasiswa, setDataMahasiswa] = useState([])
  

  // const handleSearch = (event) => {
  //     setSearchTerm(event.target.value)
  //   }

  // const getDataMahasiswa = () => {
  //   fetch('/data-mahasiswa', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       data = !props.searchTerm
  //         ? data
  //         : data.filter(person =>
  //             person.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()))
  //       setDataMahasiswa(data)
  //     })
  //   }

  // useEffect(() => {
  //   getDataMahasiswa()
  // },[searchTerm])

  const routing = useRoutes(routes);
  // console.log("App js dataMahasiswa = ", dataMahasiswa)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        {routing}
    </ThemeProvider>
  );
};

export default App;
