import React from 'react'
import WorkshopStations from './WorkshopStations';
import styles from './styles.scss';
import { MTableAction } from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { cntcl } from '../../../helpers/app';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class Modal extends React.Component {
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
    const { title, maxWidth = "sm", workshop } = this.props;
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
          classes={cntcl('paper', styles.modal_container)}
        >
          <DialogTitle id="dialog-title">{'Изменение постов автосервиса'}</DialogTitle>
          <DialogContent>
            <Typography component="h1" variant="h5">
              Автомастерская: { workshop.name }
            </Typography>
            <WorkshopStations workshop={workshop}/>
          </DialogContent>
          <div className={styles.actions}>
            <Button onClick={this.handleClose} variant="contained" color="primary" className={styles.btn}>
              Закрыть
            </Button>
          </div>
        </Dialog>
      </div>
    );
  };
}

export default Modal;
