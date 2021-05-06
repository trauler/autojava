import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createWorkshopStations,
  updateWorkshopStations,
  getWorkshopStations,
  deleteWorkshopStations,
} from '../../../actions/workshopStations'
import Table from '../../../components/Table';

class WorkshopStations extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { workshopStations: { loaded, inited }, getWorkshopStations, workshop: {id: workshopId} } = this.props;
    if (!inited && !loaded && !this.inited) getWorkshopStations(workshopId);
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Название поста', field: 'name', width: 100 },
  ]

  handleCreate = (item) => {
    const { createWorkshopStations, workshop: {id: workshopId} } = this.props;
    return createWorkshopStations(workshopId, item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { workshopStations: { items }, updateWorkshopStations, workshop: {id: workshopId} } = this.props;
    const workshopStation = items.find((item) => item.id === oldItem.id);
    workshopStation.name = newItem.name;
    return updateWorkshopStations(workshopId, workshopStation);
  }

  handleDelete = (item) => {
    const { deleteWorkshopStations, workshop: {id: workshopId} } = this.props;
    return deleteWorkshopStations(workshopId, item.id);
  }

  render() {
    const { columns } = this.state;
    const { workshopStations: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Посты автосервиса"
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
  workshopStations: state.workshopStations,
});

const mapDispatchToProps = {
  createWorkshopStations,
  updateWorkshopStations,
  getWorkshopStations,
  deleteWorkshopStations,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopStations);