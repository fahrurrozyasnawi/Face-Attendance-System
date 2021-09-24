import React from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  makeStyles
} from '@material-ui/core'
import clsx from 'clsx'
import Moment from 'react-moment'
import ScheduleIcon from '@material-ui/icons/Schedule';
import { deepOrange } from '@material-ui/core/colors';

const Clock = (props) => {
  
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={1}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item >
            <Typography
              color="textSecondary"
              gutterBottom
              variant="caption"
            >
              TIME
            </Typography>
            <Typography
              color="textPrimary"
              variant="subtitle1"
            >
              <Moment format="HH:mm" />
            </Typography>
            <Typography
              variant="subtitle2"
            >
              <Moment format="D MMM Y" />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar 
              sx={{
                backgroundColor: deepOrange[500],
                width: 36,
                height: 36
              }}
            >
              <ScheduleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Clock
