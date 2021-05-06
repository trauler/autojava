import React from 'react'
import Cars from './Cars';
import { MTableAction } from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { cntcl } from '../../../helpers/app';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  actions: {
    flex: "0 0 auto",
    display: "flex",
    padding: "20px",
    align_items: "center",
    justify_content: "space-between",
  },
  modal_container: {
    margin_top: "calc(#{$header-height} + 40px) !important",
  },
});

class CarsModal extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isOpen: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true});
  };

  handleClose = () => {
    this.setState({ isOpen: false});
  };

  renderOpenButton = () => {
    const { btn: { action, ...other } } = this.props;
    return <MTableAction {...other} action={{ ...action, onClick: this.handleClickOpen }}/>
  };

  render() {
    const { isOpen } = this.state;
    const { title, maxWidth = "sm", client, classes } = this.props;
    return (
      <div>
        {this.renderOpenButton()}
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
          disableBackdropClick
          maxWidth={maxWidth}
          fullWidth={true}
          classes={cntcl('paper', classes.modal_container)}
        >
          <DialogTitle id="dialog-title">{'Изменение автомобилей клиента'}</DialogTitle>
          <DialogContent>
            <Typography component="h1" variant="h5">
              Клиент: { client.name }
            </Typography>
            <Cars client={client}/>
          </DialogContent>
          <div className={classes.actions}>
            <Button onClick={this.handleClose} variant="contained" color="primary" className={classes.btn}>
              Закрыть
            </Button>
          </div>
        </Dialog>
      </div>
    );
  };
}

export default withStyles(styles)(CarsModal);
