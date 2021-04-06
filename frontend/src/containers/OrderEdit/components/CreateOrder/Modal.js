import React from 'react';
import { push } from 'connected-react-router';
import { FormModal } from '../../../../components/Modal';
import FormComponent from './FormComponent';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import styles from './styles.scss';
import { connect } from 'react-redux';
import { MTableAction } from 'material-table';
import { createOrder } from '../../../../actions/order';
import { ORDERS_PATH } from '../../../../constants';

class Modal extends FormModal {

  handleSave = () => {
    const { data } = this.state;
    if (this.isFormChanged() && data) {
      const { createOrder, push } = this.props;
      const { workshop: { id } = {} } = data;
      if (id)
        createOrder(id).then(({ payload: orderId }) => {
          push(`${ORDERS_PATH}/${orderId}/edit`);
        });
    }
    this.setState({ loading: false, isOpen: false });
  };

  renderOpenButton = () => {
    const { formItem, btn } = this.props;
    if (btn) {
      const { action, ...other } = btn;
      return <MTableAction {...other} action={{ ...action, onClick: this.handleClickOpen }}/>
    }
    return (
      <IconButton 
        aria-label="delete" 
        onClick={this.handleClickOpen}
        className={styles.btn}
      >
        { formItem ? <EditIcon fontSize="large"/> : <AddIcon fontSize="large"/> }
      </IconButton>
    )
  };
  
}

const mapStateToProps = (state) => ({
  title: 'Выбор мастерской',
  saveTitle: 'Создать',
  form: FormComponent,
});

const mapDispatchToProps = {
  createOrder,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
