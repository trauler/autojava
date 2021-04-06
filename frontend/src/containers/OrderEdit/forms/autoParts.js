import React from 'react';
import { connect } from 'react-redux';
import Table, { tableIcons } from '../../../components/Table';
import { OrderAutoPartEditModal } from '../components/AutoPartEdit';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  form: {
    padding: '20px',
  }
});

class OrderAutoPartsForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      columns: [],
      actions: [],
    }
  }

  componentDidMount() {
    this.setState({
      columns: this.getColumns(),
      actions: this.getActions(),
    });
  }

  handleSave = (newItem) => {
    const { id, tempId } = newItem;
    const { formData: data } = this.props;
    let newData = [];
    if (id || tempId) {
      const index = data.findIndex((item) => item.id === id || (tempId && item.tempId === tempId));
      if (index !== -1) {
        newData = [ ...data.slice(0, index), newItem, ...data.slice(index + 1)];
      } 
    } else {
      newData = [ ...data, { ...newItem, tempId: `temp_${Date.now()}`  }];
    }
    const { handleChange } = this.props;
    if (handleChange) handleChange(newData);
  }

  handleDelete = ({ id, tempId }) => {
    return new Promise((resolve, reject) => {
      const { formData: data } = this.props;
      const index = data.findIndex((item) => item.id === id || (tempId && item.tempId === tempId));
      if (index !== -1) {
        const newData = [...data.slice(0, index), ...data.slice(index + 1)];
        const { handleChange } = this.props;
        if (handleChange) handleChange(newData);
        resolve();
      };
      reject();
    });
  }

  getData = () => {
    return [];
  }

  renderWorkers = (workers) => {
    if (!workers || !workers.length)
      return '';
    return workers.map((item) => item.name).join(', ');
  }

  getColumns = () => {
    return [
      { title: 'Наименование', field: 'name' },
      { title: 'В наличии', field: 'warehouse_quantity', width: 130 },
      { title: 'Стоимость', field: 'purchase_price', width: 120 },
      { title: 'Количество', field: 'quantity', width: 120 },
      { title: 'Сумма', render: (rowData) => rowData.purchase_price && rowData.quantity ? rowData.purchase_price*rowData.quantity : '', width: 140 },
    ];
  }

  getActions = () => {
    return [
      {
        icon: tableIcons.Edit,
        tooltip: 'Редактировать',
        onClick: () => null,
        renderItem: (props) => 
          <OrderAutoPartEditModal formItem={props.data} btn={props} onSave={this.handleSave}/>
      },
      {
        icon: tableIcons.Add,
        tooltip: 'Добавить запись',
        isFreeAction: true,
        onClick: () => null,
        renderItem: (props) => 
          <OrderAutoPartEditModal btn={props} onSave={this.handleSave}/>
      }
    ];
  }
  

  render() {
    const { classes, formData } = this.props;
    const { columns, actions } = this.state;
    
    return (
      <form className={classes.form}>
        <Table
          title="Запчасти"
          columns={columns}
          data={formData}
          actions={actions}
          onDelete={this.handleDelete}
        />
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderAutoPartsForm));
