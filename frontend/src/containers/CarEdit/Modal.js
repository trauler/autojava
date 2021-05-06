import React from 'react'
import { FormModal } from '../../components/Modal';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { saveClientCar } from '../../actions/clients';
import FormComponent from './FormComponent';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  btn: {
    padding: '10px',
    marginLeft: '10px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});

class Modal extends FormModal {

  handleSave = () => {
    const { saveClientCar, config: { clientId} } = this.props;
    const { data } = this.state;
    this.setState({ loading: true });
    if (this.isFormChanged() && clientId) 
      saveClientCar(clientId, data).then(({ payload }) => {
        this.handleSaved(payload.item);
      });
    else  
      this.setState({ loading: false, isOpen: false });
  };

  handleSaved = (car) => {
    const { onSave } = this.props;
    if (onSave) onSave(car);
    this.setState({ loading: false, isOpen: false });
  };

  renderOpenButton = () => {
    const { formItem, disabled, classes } = this.props;
    
    return (
      <IconButton 
        aria-label="delete" 
        onClick={this.handleClickOpen}
        className={classes.btn}
        disabled={disabled}
      >
        { formItem ? <EditIcon fontSize="large"/> : <AddIcon fontSize="large"/> }
      </IconButton>
    )
  };
  
}

const mapStateToProps = (state, props) => ({
  title: `${ props.id ? 'Редактирование' : 'Создание'} автомобиля`,
  form: FormComponent,
});

const mapDispatchToProps = {
  saveClientCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Modal));
