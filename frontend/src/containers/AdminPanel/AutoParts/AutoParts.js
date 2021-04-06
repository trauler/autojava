import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createAutoParts,
  updateAutoParts,
  getAutoParts,
  deleteAutoParts,
} from '../../../actions/autoParts'
import Table from '../../../components/Table';

class AutoParts extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { autoParts: { loaded, inited }, getAutoParts } = this.props;
    if (!inited && !loaded && !this.inited) getAutoParts();
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Название запчасти', field: 'name', width: 100 },
    { title: 'Номер запчасти', field: 'number', width: 100 },
  ]

  handleCreate = (item) => {
    const { createAutoParts } = this.props;
    return createAutoParts(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { autoParts: { items }, updateAutoParts } = this.props;
    const autoNode = items.find((item) => item.id === oldItem.id);
    autoNode.name = newItem.name;
    autoNode.number = newItem.number;
    return updateAutoParts(autoNode);
  }

  handleDelete = (item) => {
    const { deleteAutoParts } = this.props;
    return deleteAutoParts(item.id);
  }

  render() {
    const { columns } = this.state;
    const { autoParts: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Автозапчасти"
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
  autoParts: state.autoParts,
});

const mapDispatchToProps = {
  createAutoParts,
  updateAutoParts,
  getAutoParts,
  deleteAutoParts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoParts);
