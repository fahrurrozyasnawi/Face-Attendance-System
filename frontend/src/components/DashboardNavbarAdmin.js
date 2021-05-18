import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    AppBar,
    Badge,
    Box,
    Hidden,
    IconButton,
    Toolbar
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import Logo from './Logo'

const DashboardNavbarAdmin = ({ onMobileNavOpen, ...rest }) => {
  const [notification] = useState([])

  return (
    <AppBar>
      <Toolbar>
        <RouterLink to="/admin">
            <Logo />
        </RouterLink>
        <Box sx={{ flewGrow : 1 }} />
        <Hidden lgDown>
          <IconButton color='inherit' >
            <Badge
              badgeContent={notification.length}
              color='primary'
              variant='dot'
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color='inherit'>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color='inherit'
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

DashboardNavbarAdmin.propTypes = {
  onMobileNavOpen: PropTypes.func
}

export default DashboardNavbarAdmin
