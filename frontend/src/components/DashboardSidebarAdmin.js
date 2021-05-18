import React, { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List
} from '@material-ui/core'
import NavItem from './NavItem'
import {
  Grid as DashboardIcon,
  Users as DataIcon,
  FileText as DataAbsensiIcon,
  Image as DataWajahIcon
} from 'react-feather'

const items = [
  {
    href: '/admin/dashboard',
    icon: DashboardIcon,
    title: 'Dashboard'
  },
  {
    href: '/admin/mahasiswa',
    icon: DataIcon,
    title: 'Mahasiswa'
  },
  {
    href: '/admin/dosen',
    icon: DataIcon,
    title: 'Dosen'
  },
  {
    href: '/admin/absensi',
    icon: DataAbsensiIcon,
    title: 'Absensi'
  },
  {
    href: '/admin/face',
    icon: DataWajahIcon,
    title: 'Data Wajah'
  }
]

const DashboardSidebarAdmin = ({ onMobileClose, openMobile }) => {
  const location = useLocation()

  useEffect(() => {
    if(openMobile && onMobileClose){
      onMobileClose()
    }
  }, [location.pathname])

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Divider />
      <Box sx={{p: 2}} >
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href} 
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  )
  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor='left'
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
          PaperProps={{
            sx:{
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor='left'
          open
          variant='persistent'
          PaperProps={{
            sx:{
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

DashboardSidebarAdmin.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
}

DashboardSidebarAdmin.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
}

export default DashboardSidebarAdmin
