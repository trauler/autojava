import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createWorkshops,
  updateWorkshops,
  getWorkshops,
  deleteWorkshops,
} from '../../../actions/workshops'
import Table from '../../../components/Table';
import Modal  from './Modal';
import Menu from '@material-ui/icons/Menu';

class WorkshopsComp extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: [],
      actions: [],
      options: {}
    });
  }

  componentDidMount = () => {
    const { workshops: { loaded, inited }, getWorkshops } = this.props;
    if (!inited && !loaded && !this.inited) getWorkshops();
    this.inited = true;
    this.setState({
      columns: this.getColumns(),
      actions: this.getActions(),
      options: this.getOptions(),
    });
  }

  getColumns = () => [
    { title: 'Название автомастерской', field: 'name', width: 100 },
  ]

  getActions = () => [
    {
      icon: Menu,
      tooltip: 'Редактировать посты',
      onClick: () => null,
      renderItem: (props) =>
        <Modal workshop={props.data} maxWidth='md' btn={props}/>
    }
  ]

  getOptions = () => ({
    actionsColumnIndex: 0,
  });

  handleCreate = (item) => {
    const { createWorkshops } = this.props;
    return createWorkshops(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { workshops: { items }, updateWorkshops } = this.props;
    const workshop = items.find((item) => item.id === oldItem.id);
    workshop.name = newItem.name;
    return updateWorkshops(workshop);
  }

  handleDelete = (item) => {
    const { deleteWorkshops } = this.props;
    return deleteWorkshops(item.id);
  }

  render() {
    const { columns, actions, options } = this.state;
    const { workshops: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Автомастерские"
          columns={ columns }
          data={ items }
          onCreate={ this.handleCreate }
          onUpdate={ this.handleUpdate }
          onDelete={ this.handleDelete }
          actions={ actions }
          options={ options }
          />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  workshops: state.workshops,
});

const mapDispatchToProps = {
  createWorkshops,
  updateWorkshops,
  getWorkshops,
  deleteWorkshops,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopsComp);
