import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import DashboardLayoutAdmin from 'src/components/DashboardLayoutAdmin'
import MainLayout from 'src/components/MainLayout';
import AbsensiAdmin from 'src/pages/AbsensiAdmin'
import DataWajah from 'src/pages/HasilAbsensi'
import Dosen from 'src/pages/DosenAdmin'
import MahasiswaAdmin from 'src/pages/MahasiswaAdmin'
import DashboardAdmin from 'src/pages/DashboardAdmin'
import Absensi from 'src/pages/Absensi'
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login'
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Mahasiswa from './pages/Mahasiswa';
import AddMahasiswa from 'src/components/mahasiswa/AddMahasiswa'
import EditMahasiswa from 'src/components/mahasiswa/EditMahasiswa'
import MahasiswaList from './components/mahasiswa/MahasiswaList';
import MahasiswaToolbar from './components/mahasiswa/MahasiswaToolbar';
import AbsenToolbar from './components/absen/AbsenToolbar';
import DosenToolbar from './components/dosen/DosenToolbar';
import HasilAbsensi from 'src/pages/HasilAbsensi';
import HasilAbsensiToolbar from './components/hasil-absen/HasilAbsensiToolbar';
import ListMahasiswa from './components/hasil-absen/ListMahasiswa';

// Function

  // const routes = (props) => [
  const routes = [
    {
      path: 'app',
      element: <DashboardLayout />,
      children: [
        { path: 'mahasiswa', element: <Mahasiswa /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'absensi', element: <Absensi /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: 'admin',
      element: <DashboardLayoutAdmin />,
      children: [
        { path: 'dashboard', element: <DashboardAdmin /> },
        { path: 'absensi', element: <AbsensiAdmin />, children: [
          { path: 'list', element: <AbsenToolbar />}
        ] },
        { path: 'mahasiswa', element: <MahasiswaAdmin />, children : [
          { path: 'list', element: <MahasiswaToolbar /> },
          { path: 'add', element: <AddMahasiswa /> },
          { path: ':id', element: <EditMahasiswa />}
        ] },
        // { path: 'mahasiswa', element: <MahasiswaAdmin /> },
        { path: 'hasil', element: <HasilAbsensi />, children : [
          { path: 'list', element: <HasilAbsensiToolbar /> }
        ] },
        { path: 'dosen', element: <Dosen /> ,children: [
          {path: 'list', element: <DosenToolbar /> },
          {path: ':id', element: <ListMahasiswa />}
        ] },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/admin/dashboard" /> },
        { path: '/admin/', element: <Navigate to="/admin/dashboard" /> },
        { path: '/admin/mahasiswa/', element: <Navigate to="/admin/mahasiswa/list" /> },
        { path: '/admin/dosen/', element: <Navigate to="/admin/dosen/list" /> },
        { path: '/admin/absensi/', element: <Navigate to="/admin/absensi/list" /> },
        { path: '/admin/hasil/', element: <Navigate to="/admin/hasil/list" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ]

export default routes;
