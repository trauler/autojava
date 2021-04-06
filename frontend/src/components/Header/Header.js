import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { getRoutes } from './helpers';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles.scss';
import { cntcl } from '../../helpers/app';

const useStyles = makeStyles((theme) => ({
  exit_button: {
    color: theme.palette.primary.contrastText,
  },
  active_item: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover' : {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    }
  },
  active_item_icon: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function Header(props) {
  const [routes, setRoutes] = useState([]);
  const classes = useStyles();
  const { router: { location } } = props;

  useEffect(() => {
    setRoutes(getRoutes(location, classes))
  }, [location])

  const handleLogOut = () => {
    const { userLogOut } = props;
    userLogOut();
  }
  
  return (
    <div>
      <AppBar position="fixed" className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap >
            Auto
          </Typography>
          <Tooltip title="Выход">
            <IconButton 
              aria-label="delete" 
              onClick={handleLogOut}
              className={classes.exit_button}
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        classes={cntcl('paper', styles.drawer)}
        open
      >
        <div className={styles.drawer__content}>
          <List>{routes}</List>
        </div>
      </Drawer>
    </div>
  );
}