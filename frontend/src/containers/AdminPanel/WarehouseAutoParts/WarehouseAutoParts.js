import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createWarehouseAutoParts,
  updateWarehouseAutoParts,
  getWarehouseAutoPartsData,
  deleteWarehouseAutoParts,
} from '../../../actions/warehouseAutoParts'
import {
  getAutoParts
} from '../../../actions/autoParts'
import {
  getWarehouses
} from '../../../actions/warehouses'
import Table from '../../../components/Table';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class WarehouseAutoParts extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { getWarehouseAutoPartsData } = this.props;
    if (!this.inited) getWarehouseAutoPartsData();
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Точный адрес', field: 'description', width: 100 },
    { title: 'Цена закупки', field: 'purchase_price', type: 'numeric', width: 100 },
    { title: 'Цена продажи', field: 'retail_price', type: 'numeric', width: 100 },
    { title: 'Количество на складе', field: 'quantity', type: 'numeric', width: 100 },
    { title: 'Автозапчасть', field: 'auto_part', width: 300,
      render: rowData => {
        const value = rowData.auto_part ? rowData.auto_part.name : null;
        return (<> {value} </>)
      },
      editComponent: props => {
        return (
        <Autocomplete
          noOptionsText="Нет совпадений"
          fullWidth={ true }
          options={ this.props.autoParts.items }
          getOptionLabel={(option) => option.name }
          getOptionSelected={ (a, b) => { return a.id === b.id} }
          renderInput={(params) => <TextField {...params} />}
          value={ props.value }
          onChange={ (event, value) => { props.onChange(value); } }
        />
        )
      }
    },
    { title: 'Склад', field: 'warehouse', width: 300,
      render: rowData => {
        const value = rowData.warehouse ? rowData.warehouse.name : null;
        return (<> {value} </>)
      },
      editComponent: props => {
        return (
        <Autocomplete
          noOptionsText="Нет совпадений"
          fullWidth={ true }
          options={ this.props.warehouses.items }
          getOptionLabel={(option) => option.name }
          getOptionSelected={ (a, b) => { return a.id === b.id} }
          renderInput={(params) => <TextField {...params} />}
          value={ props.value }
          onChange={ (event, value) => { props.onChange(value); } }
        />
        )
      }
    },
  ]

  handleCreate = (item) => {
    const { createWarehouseAutoParts } = this.props;
    return createWarehouseAutoParts(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { warehouseAutoParts: { items }, updateWarehouseAutoParts } = this.props;
    let warehouseAutoPart = items.find((item) => item.id === oldItem.id);
    const { id, vid, updatedAt, ...changedValues } = newItem;
    warehouseAutoPart = { ...warehouseAutoPart, ...changedValues };
    return updateWarehouseAutoParts(warehouseAutoPart);
  }

  handleDelete = (item) => {
    const { deleteWarehouseAutoParts } = this.props;
    return deleteWarehouseAutoParts(item.id);
  }
  render() {
    const { columns } = this.state;
    return(
      <div className={styles.container}>
        <Table
          title="Стаки автозапчастей"
          columns={ columns }
          data={ this.props.warehouseAutoParts.items }
          onCreate={ this.handleCreate }
          onUpdate={ this.handleUpdate }
          onDelete={ this.handleDelete }
          />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  warehouseAutoParts: state.warehouseAutoParts,
  autoParts: state.autoParts,
  warehouses: state.warehouses,
});

const mapDispatchToProps = {
  createWarehouseAutoParts,
  updateWarehouseAutoParts,
  getWarehouseAutoPartsData,
  deleteWarehouseAutoParts,
  getAutoParts,
  getWarehouses,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseAutoParts);
