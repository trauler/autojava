import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createServices,
  getServices,
  updateServices,
  deleteServices,
} from '../../../actions/adminPanel/services'
import Table from '../../../components/Table';

class Services extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = ({
      columns: [],
    });
  }

  componentDidMount = () => {
    this.setState({
      columns: this.getColumns(),
    });
  }

  getColumns = () => [
    { title: 'Код услуги', field: 'code', width: 100 },
    { title: 'Название услуги', field: 'name', width: 100 },
    { title: 'Стоимость услуги', field: 'cost', width: 100 },
    { title: 'Фиксированная цена', field: 'fixed_price', type: 'boolean', initialEditValue: true, width: 100 },
  ]

  handleCreate = (item) => {
    const { createServices, serviceTypeId } = this.props;
    return createServices({ ...item, service_type: { id: serviceTypeId } });
  }

  handleUpdate = (newItem, oldItem) => {
    const { updateServices } = this.props;
    return updateServices(newItem);
  }

  handleDelete = (item) => {
    const { deleteServices } = this.props;
    return deleteServices(item.id);
  }

  prepareServices = (services, serviceTypeId) => serviceTypeId ?
    services.filter((s) => s.service_type && s.service_type.id === serviceTypeId) :
    services.filter((s) => s.service_type === null)

  render() {
    const { columns } = this.state;
    const { services: { items }, serviceTypeId } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Услуги"
          columns={ columns }
          data={ this.prepareServices(items, serviceTypeId) }
          onCreate={ this.handleCreate }
          onUpdate={ this.handleUpdate }
          onDelete={ this.handleDelete }
          />
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  services: state.adminServices
})

const mapDispatchToProps = {
  createServices,
  getServices,
  updateServices,
  deleteServices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
