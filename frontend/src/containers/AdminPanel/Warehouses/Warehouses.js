import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createWarehouses,
  updateWarehouses,
  getWarehouses,
  deleteWarehouses,
} from '../../../actions/warehouses'
import Table from '../../../components/Table';

class Warehouses extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { warehouses: { loaded, inited }, getWarehouses } = this.props;
    if (!inited && !loaded && !this.inited) getWarehouses();
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Название склада', field: 'name', width: 100 },
    { title: 'Адрес склада', field: 'address', width: 100 },
  ]

  handleCreate = (item) => {
    const { createWarehouses } = this.props;
    return createWarehouses(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { warehouses: { items }, updateWarehouses } = this.props;
    const warehouse = items.find((item) => item.id === oldItem.id);
    warehouse.name = newItem.name;
    warehouse.address = newItem.address;
    return updateWarehouses(warehouse);
  }

  handleDelete = (item) => {
    const { deleteWarehouses } = this.props;
    return deleteWarehouses(item.id);
  }

  render() {
    const { columns } = this.state;
    const { warehouses: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Склады"
          columns={ columns }
          data={ items }
          onCreate={ this.handleCreate }
          onUpdate={ this.handleUpdate }
          onDelete={ this.handleDelete }
          />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  warehouses: state.warehouses,
});

const mapDispatchToProps = {
  createWarehouses,
  updateWarehouses,
  getWarehouses,
  deleteWarehouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Warehouses);
