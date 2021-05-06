import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Fade, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '120px 240px',
  },
  title: {
    color: theme.palette.primary.main,
  }
}));

const MainPage = (props) => {
  const classes = useStyles();
  const [faded, setFaded] = useState(false);
  
  const { user: { name } = {} } = props;

  useEffect(() => {
    if (name) {
      setFaded(true);
    }
  }, [name])

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h1" className={classes.title}>
          <Fade in={faded} timeout={1500}>
            <span>Привет</span>
          </Fade>
          <Fade in={faded} timeout={1000} style={{ transitionDelay: '500ms' }}>
            <span>, </span>
          </Fade>
          <Fade in={faded} timeout={1500} style={{ transitionDelay: '1000ms' }}>
            <span>{name}</span>
          </Fade>
        </Typography>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
