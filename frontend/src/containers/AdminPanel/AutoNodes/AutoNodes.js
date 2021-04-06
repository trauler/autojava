import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.scss';
import {
  createAutoNodes,
  updateAutoNodes,
  getAutoNodes,
  deleteAutoNodes,
} from '../../../actions/autoNodes'
import Table from '../../../components/Table';

class AutoNodes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: []
    });
  }

  componentDidMount = () => {
    const { autoNodes: { loaded, inited }, getAutoNodes } = this.props;
    if (!inited && !loaded && !this.inited) getAutoNodes();
    this.inited = true;
    this.setState({
      columns: this.getColumns()
    });
  }

  getColumns = () => [
    { title: 'Название узла', field: 'name', width: 100 },
  ]

  handleCreate = (item) => {
    const { createAutoNodes } = this.props;
    return createAutoNodes(item);
  }

  handleUpdate = (newItem, oldItem) => {
    const { autoNodes: { items }, updateAutoNodes } = this.props;
    const autoNode = items.find((item) => item.id === oldItem.id);
    autoNode.name = newItem.name;
    return updateAutoNodes(autoNode);
  }

  handleDelete = (item) => {
    const { deleteAutoNodes } = this.props;
    return deleteAutoNodes(item.id);
  }

  render() {
    const { columns } = this.state;
    const { autoNodes: { items } } = this.props;
    return(
      <div className={styles.container}>
        <Table
          title="Узлы"
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
  autoNodes: state.autoNodes,
});

const mapDispatchToProps = {
  createAutoNodes,
  updateAutoNodes,
  getAutoNodes,
  deleteAutoNodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoNodes);
