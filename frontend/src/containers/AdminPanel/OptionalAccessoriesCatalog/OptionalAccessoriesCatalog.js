import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createOptionalAccessories,
  updateOptionalAccessories,
  getOptionalAccessories,
  deleteOptionalAccessories,
} from '../../../actions/adminPanel/optionalAccessories'
import Table from '../../../components/Table';

class OptionalAccessoriesCatalog extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { optionalAccessories: { loaded, inited }, getOptionalAccessories } = this.props;
    if (!inited && !loaded && !this.inited) getOptionalAccessories();
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Название аксессуара', field: 'name', width: 100 },
  ]

  handleCreate = (item) => {
    const { createOptionalAccessories } = this.props;
    return createOptionalAccessories(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { optionalAccessories: { items }, updateOptionalAccessories } = this.props;
    const accessory = items.find((item) => item.id === oldItem.id);
    accessory.name = newItem.name;
    return updateOptionalAccessories(accessory);
  }

  handleDelete = (item) => {
    const { deleteOptionalAccessories } = this.props;
    return deleteOptionalAccessories(item.id);
  }

  render() {
    const { columns } = this.state;
    const { optionalAccessories: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Аксессуары"
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
  optionalAccessories: state.adminOptionalAccessories,
});

const mapDispatchToProps = {
  createOptionalAccessories,
  updateOptionalAccessories,
  getOptionalAccessories,
  deleteOptionalAccessories,
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionalAccessoriesCatalog);
