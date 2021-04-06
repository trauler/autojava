
import FormController from '../../components/FormController';

import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link color="inherit" href="/">
        Auto-App
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(8),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(2),
    fontSize: '1rem',
  },
  form_item: {
    width: '100%',
  },
  progress: {
    color: theme.palette.primary.contrastText,
  }
});

class AuthPage extends FormController {

  componentDidMount() {
    const { tryLogin } = this.props;
    tryLogin();
  }

  handleSubmit = (event) => {
    const { data } = this.state;
    const { userAuth } = this.props;
    event.preventDefault();
    userAuth(data);
  }

  renderFields = () => {
    const { classes } = this.props;
    return [
      this.renderFieldWithValidator({
        FieldComponent: OutlinedInput,
        field: "email",
        label: "E-mail",
        type: "email",
        fullWidth: true,
        containerStyles: classes.form_item,
      }),
      this.renderFieldWithValidator({
        FieldComponent: OutlinedInput,
        field: "password",
        label: "Пароль",
        type: "password",
        fullWidth: true,
        containerStyles: classes.form_item,
      })
    ];
  }

  render () {
    const { classes, user: { loaded, error } } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти в систему
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            {this.renderFields()}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              { loaded ? "Войти" : <CircularProgress size={28} className={classes.progress} /> }
            </Button>
            { error ? (
              <Typography color="error" >
                Не удаётся войти. Попробуйте снова
              </Typography>
            ) : null}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Регистрация
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
        <Box mt={2}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(AuthPage);
