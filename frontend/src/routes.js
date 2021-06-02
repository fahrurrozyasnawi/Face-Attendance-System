import { element } from 'prop-types';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import DashboardLayoutAdmin from 'src/components/DashboardLayoutAdmin'
import MainLayout from 'src/components/MainLayout';
import DashboardAdmin from 'src/pages/DashboardAdmin'
import Absensi from 'src/pages/Absensi'
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login'
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Mahasiswa from './pages/Mahasiswa';

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
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: 'admin', element: <Navigate to="/admin/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
