import React from 'react';
import { connect } from 'react-redux';
import Table, { tableIcons } from '../../../components/Table';
import { OrderServiceEditModal } from '../components/ServiceEdit';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  form: {
    padding: '20px',
  }
});

class OrderServicesForm extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      // data: [],
      columns: [],
    }
  }

  // init = () => {
  //   const { clients: { loaded, inited }, getClients } = this.props;
  //   if (!inited && !loaded && !this.inited) getClients();
  //   this.inited = true;
  // }

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

  renderWorkers = (workers) => {
    if (!workers || !workers.length)
      return '';
    return workers.map((item) => item.name).join(', ');
  }

  getColumns = () => {
    return [
      { title: 'Код', field: 'code', width: 100 },
      { title: 'Наименование', field: 'name' },
      { title: 'Исполнители', field: 'workers', render: (rowData) => this.renderWorkers(rowData.workers)},
      { title: 'Стоимость', field: 'cost', width: 120 },
      { title: 'Количество', field: 'quantity', width: 120 },
      { title: 'Сумма', render: (rowData) => rowData.cost && rowData.quantity ? rowData.cost*rowData.quantity : '', width: 140 },
    ];
  }

  getActions = () => {
    return [
      {
        icon: tableIcons.Edit,
        tooltip: 'Редактировать',
        onClick: () => null,
        renderItem: (props) =>
          <OrderServiceEditModal formItem={props.data} btn={props} onSave={this.handleSave}/>
      },
      {
        icon: tableIcons.Add,
        tooltip: 'Добавить запись',
        isFreeAction: true,
        onClick: () => null,
        renderItem: (props) =>
          <OrderServiceEditModal btn={props} onSave={this.handleSave}/>
      }
    ];
  }


  render() {
    const { classes, formData } = this.props;
    const { columns, actions } = this.state;

    return (
      <form className={classes.form}>
        <Table
          title="Оказываемые услуги"
          columns={columns}
          data={formData || []}
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderServicesForm));
