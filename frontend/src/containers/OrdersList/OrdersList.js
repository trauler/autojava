import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Table, { tableIcons } from '../../components/Table';
import { MTableAction } from 'material-table';
import { getOrders } from '../../actions/orders';
import { CreateOrderModal } from '../OrderEdit/components/CreateOrder';
import { ORDERS_PATH } from '../../constants';
import { withStyles } from '@material-ui/styles';


const styles = (theme) => ({
  container: {
    padding: '20px',
  },
  link: {
    color: 'black'
  }
});


class OrdersList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = ({
      columns: [],
      actions: [],
    });
  }

  componentDidMount = () => {
    const { orders: { loaded, inited }, getOrders } = this.props;
    if (!inited && !loaded && !this.inited) getOrders();
    this.inited = true;
    this.setState({
      columns: this.getColumns(),
      actions: this.getActions(),
    });
  }

  getColumns = () => [
    { title: 'ID', field: 'id', width: 100 },
    { title: 'Клиент', field: 'client' },
  ];

  getActions = () => {
    const { push } = this.props;
    return [
      {
        icon: tableIcons.Edit,
        tooltip: 'Редактировать',
        onClick: (_, data) => {push(`${ORDERS_PATH}/${data.id}/edit`)},
        renderItem: (props) => 
          <MTableAction {...props}/>
      },
      {
        icon: tableIcons.Add,
        tooltip: 'Добавить запись',
        isFreeAction: true,
        onClick: () => null,
        renderItem: (props) => 
          <CreateOrderModal btn={props}/>
      }
    ];
  }

  render() {
    const { columns, actions } = this.state;
    const { orders: { items }, classes } = this.props;
    
    return(
      <div className={classes.container}>
        <Table
          title="Заказ-наряды"
          columns={ columns }
          data={ items }
          actions={ actions }
          // onCreate={ this.handleCreate }
          // onUpdate={ this.handleUpdate }
          // onDelete={ this.handleDelete }
          />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

const mapDispatchToProps = {
  getOrders,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrdersList));
