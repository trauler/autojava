import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createServiceType,
  getServiceTypes,
  updateServiceType,
  deleteServiceType,
  getServiceTypesAndServices,
  updateServiceTypeAndGetService,
} from '../../../actions/adminPanel/serviceTypes'
import { getServices } from '../../../actions/adminPanel/services'
import Table from '../../../components/Table';
import { Services } from '../Services';
import services from '../../../reducers/adminPanel/services';
import { Icon } from '@material-ui/core';

class ServiceTypes extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = ({
      columns: [],
      defaultColumn: {},
      detailPanel: [],
    });
  }

  componentDidMount() {
    const { getServiceTypesAndServices } = this.props;
    if (!this.inited) getServiceTypesAndServices();
    this.inited = true;
    this.setState({
      columns: this.getColumns(),
      defaultColumn: this.getDefaultColumn(),
      detailPanel: this.getDetailPanel(),
    });
  }

  getColumns = () => [
    { title: 'Наименование раздела', field: 'name' },
  ]

  getDefaultColumn = () => ({
    name: 'Другие услуги',
  })

  getDetailPanel = () => [{
    disabled: true,
    icon: () => <></>,
    render: (rowData) => (<Services serviceTypeId={rowData.id}/>),
  }]

  handleCreate = (item) => {
    const { createServiceType } = this.props;
    return createServiceType(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { updateServiceTypeAndGetService } = this.props;
    return updateServiceTypeAndGetService(newItem);
  }

  handleDelete = (item) => {
    const { deleteServiceType } = this.props;
    return deleteServiceType(item.id);
  }

  render() {
    const { columns, defaultColumn, detailPanel } = this.state;
    const { serviceTypes: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Разделы услуг"
          columns={ columns }
          data={ [ ...items, defaultColumn ] }
          detailPanel={ detailPanel }
          onCreate={ this.handleCreate }
          onUpdate={ this.handleUpdate }
          onDelete={ this.handleDelete }
          editableOptions={{
            isEditHidden: (rowData) => rowData.id === undefined,
            isDeleteHidden: (rowData) => rowData.id === undefined,
          }}
          onRowClick={ (event, rowData, togglePanel) => togglePanel() }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  serviceTypes: state.adminServiceTypes,
  services: state.adminServices,
});

const mapDispatchToProps = {
  createServiceType,
  getServiceTypes,
  updateServiceType,
  deleteServiceType,
  getServices,
  getServiceTypesAndServices,
  updateServiceTypeAndGetService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceTypes);
