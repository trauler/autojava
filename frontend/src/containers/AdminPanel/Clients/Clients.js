import React from 'react';
import { connect } from 'react-redux';
import {
  getClients,
} from '../../../actions/clients'
import Table, { tableIcons } from '../../../components/Table';
import CarsModal from './CarsModal'
import { withStyles } from '@material-ui/styles';
import { ClientEditModal } from '../../ClientEdit'

const styles = (theme) => ({
  container: {
    padding: '20px'
  },
});

class Clients extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: [],
      actions: [],
      options: {}
    });
  }

  componentDidMount = () => {
    const { clients: { loaded, inited }, getClients } = this.props;
    if (!inited && !loaded && !this.inited) getClients();
    this.inited = true;
    this.setState({
      columns: this.getColumns(),
      actions: this.getActions(),
      options: this.getOptions(),
    });
  }

  shouldComponentUpdate = (prevProps) => {
    return this.props.clients.items !== prevProps.clients.items
  }

  getColumns = () => [
    { title: 'Имя клиента', field: 'name', width: 100 },
  ]

  getActions = () => [
    {
      icon: tableIcons.Edit,
      tooltip: 'Редактировать клиента',
      onClick: () => null,
      renderItem: (props) =>
        <ClientEditModal formItem={props.data} maxWidth='md' btn={props}/>
    },
    {
      icon: tableIcons.Edit,
      tooltip: 'Редактировать автомобили',
      onClick: () => null,
      renderItem: (props) =>
        <CarsModal client={props.data} maxWidth='md' btn={props}/>
    }
  ]

  getOptions = () => ({
    actionsColumnIndex: 0,
  });

  render() {
    const { columns, actions, options } = this.state;
    const { classes, clients: { items } } = this.props;

    return(
      <div className={classes.container}>
        <Table
          title="Клиенты"
          columns={ columns }
          data={ items }
          actions={ actions }
          options={ options }
          />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  clients: state.clients,
});

const mapDispatchToProps = {
  getClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clients));