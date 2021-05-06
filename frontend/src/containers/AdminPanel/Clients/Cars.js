import React from 'react';
import { connect } from 'react-redux';
import {
  getClientCars,
  saveClientCar,
  deleteClientCar
} from '../../../actions/clients'
import Table from '../../../components/Table';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  container: {
    padding: '20px'
  },
});

class Cars extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { getClientCars, client: {id: clientId} } = this.props;
    if (!this.inited) getClientCars(clientId);
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Марка', field: 'brand', width: 100 },
    { title: 'Модель', field: 'model', width: 100 },
    { title: 'VIN', field: 'vin', width: 100 },
    { title: 'Регистрационный номер', field: 'plate', width: 100 },
  ]

  handleCreate = (item) => {
    const { saveClientCar, client: {id: clientId} } = this.props;
    return saveClientCar(clientId, item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { clients: { carsItems: items }, saveClientCar, client: {id: clientId} } = this.props;
    let car = items[clientId].find((item) => newItem.id === item.id);
    const { id, vid, ...changedValues } = newItem;
    car = { ...car, ...changedValues };
    return saveClientCar(clientId, car);
  }

  handleDelete = (item) => {
    const { deleteClientCar, client: {id: clientId} } = this.props;
    return deleteClientCar(clientId, item.id);
  }

  render() {
    const { columns } = this.state;
    const { clients: { carsItems: items }, classes, client: { id: clientId } } = this.props;
    return(
      <div className={classes.container}>
        <Table
          title="Автомобили клента"
          columns={ columns }
          data={ items[clientId] }
          onCreate={ this.handleCreate }
          onUpdate={ this.handleUpdate }
          onDelete={ this.handleDelete }
          />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  clients: state.clients
});

const mapDispatchToProps = {
  getClientCars,
  saveClientCar,
  deleteClientCar,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cars));