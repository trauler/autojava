import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, CircularProgress } from "@material-ui/core";
import MultiStepsForm from "../../components/MultiStepsForm";
import OrderClientForm from './forms/client';
import OrderServicesForm from './forms/services';
import OrderAutoPartsForm from './forms/autoParts';
import { getOrder } from '../../actions/order';
import { getOrdersUrl } from '../../selectors/urls';
import { cntcl } from '../../helpers/app';
import { formatClientData } from '../../helpers/data';
import { ORDERS_PATH } from '../../constants';

const clientsDataParser = (data) => {
  const { client, ...other } = data
  return {
    client: formatClientData(client),
    ...other
  };
};

const servicesDataParser = (data) => {
  if (data && data.length) {
    return data.map((item) => {
      const { service: { name = '', code = '' } = {} } = item;
      return {
        ...item,
        name,
        code,
      };
    })
  } else return data;
};

const autoPartsDataParser = (data) => {
  if (data && data.length) {
    return data.map((item) => {
      const { 
        quantity, 
        warehouse_auto_part: { 
          auto_part: { name = '' } = {},
          purchase_price, 
          quantity: warehouse_quantity,
        } = {},
      } = item;
      return {
        ...item,
        name,
        purchase_price,
        quantity,
        warehouse_quantity,
      };
    })
  } else return data;
};

const autoPartsDataFormatter = (data) => {
  if (data && data.length) {
    return data.map((item) => {
      const { autoPart } = item;
      return {
        ...item,
        warehouse_auto_part: autoPart,
      };
    })
  } else return data;
};

const steps = [
  {
    label: 'Клиент',
    formComponent: OrderClientForm,
    name: 'client_info',
    apiPath: '/client-info',
    dataParser: clientsDataParser,
  },
  {
    label: 'Услуги',
    formComponent: OrderServicesForm,
    name: 'orders_services',
    apiPath: '/services',
    dataParser: servicesDataParser,
  },
  {
    label: 'Запчасти',
    formComponent: OrderAutoPartsForm,
    name: 'orders_parts',
    apiPath: '/warehouse-auto-parts',
    dataParser: autoPartsDataParser,
    saveDataFormatter: autoPartsDataFormatter,
  },
];

const getConfig = (id) => ({
  rootApi: getOrdersUrl(id),
  rootName: 'order_',
  exitPath: ORDERS_PATH,
});

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '40px',
    textAlign: 'center',
  },
  progress: {
    marginTop: theme.spacing(16),
  },
}));

function OrderEdit(props) {
  const classes = useStyles();
  const [config, setConfig] = useState({});
  const { match: { params: { id } = {} } = {}, getOrder, order: { loaded, item } } = props;

  useEffect(() => {
    setConfig(getConfig(id));
    getOrder(id);
  }, [id, getOrder]);

  return (
    <Box>
      <Container classes={cntcl('root', classes.root)}>
        { loaded ? <MultiStepsForm steps={steps} config={config} data={item}/> : <CircularProgress size={128} className={classes.progress}/> }
      </Container>
    </Box>
  )
};


const mapStateToProps = (state) => ({
  order: state.order,
});

const mapDispatchToProps = {
  getOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderEdit);