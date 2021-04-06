import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';
import Router from './Router';
import { ORDERS_PATH } from '../../constants';
import Wrapper from '../../components/Wrapper';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import SettingsIcon from '@material-ui/icons/Settings';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DescriptionIcon from '@material-ui/icons/Description';
import PeopleIcon from '@material-ui/icons/People';
import OrderEdit from '../OrderEdit';
import { OptionalAccessoriesCatalog } from '../AdminPanel/OptionalAccessoriesCatalog'
import { AutoNodes } from '../AdminPanel/AutoNodes'
import { AutoParts } from '../AdminPanel/AutoParts'
import { Warehouses } from '../AdminPanel/Warehouses'
import { WarehouseAutoParts } from '../AdminPanel/WarehouseAutoParts'
import { ServiceTypes } from '../AdminPanel/ServiceTypes'
import { Workshops } from '../AdminPanel/Workshops'
import { Clients } from '../AdminPanel/Clients'
import { OrdersList } from '../OrdersList';
import MainPage from '../MainPage';
// import { lazy } from 'react';
// const Component = lazy(() => import('../Component'));

const TestComp = () => {
return (<div>test component <Link className="ref" to="/orders/1/edit">goto edit order</Link></div>)
}

export const defaultRouter = [
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/',
    component: MainPage,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: ORDERS_PATH,
    component: OrdersList,
    group: 'Документы',
    title: 'Заказ-наряды',
    icon: DescriptionIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: `${ORDERS_PATH}/:id/edit`,
    component: OrderEdit,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/optional-accessories',
    component: OptionalAccessoriesCatalog,
    group: 'Администратор',
    title: 'Справочник аксессуаров',
    icon: AttachmentIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/auto-nodes',
    component: AutoNodes,
    group: 'Администратор',
    title: 'Справочник узлов',
    icon: EmojiTransportationIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/auto-parts',
    component: AutoParts,
    group: 'Администратор',
    title: 'Справочник автозапчастей (системный)',
    icon: SettingsIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/warehouses',
    component: Warehouses,
    group: 'Администратор',
    title: 'Справочник складов',
    icon: HomeWorkIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/service-types',
    component: ServiceTypes,
    group: 'Администратор',
    title: 'Справочник услуг',
    icon: ListAltIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/warehouse-auto-parts',
    component: WarehouseAutoParts,
    group: 'Администратор',
    title: 'Справочник стаков автозапчастей',
    icon: AllInboxIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/workshops',
    component: Workshops,
    group: 'Администратор',
    title: 'Справочник автомастерских',
    icon: NotInterestedIcon,
  },
  {
    type: 'route',
    exact: true,
    strict: true,
    path: '/admin/clients',
    component: Clients,
    group: 'Администратор',
    title: 'Справочник клиентов',
    icon: PeopleIcon,
  }
];

const getRouter = () => {
  return defaultRouter.map((item) => {
    const { type, exact, path, component: Component } = item;
    return {
      type,
      exact,
      path,
      component: (props) => (<Wrapper><Component {...props}/></Wrapper>)
    };
  });
};

export const getMenuRouter = () => {
  const groups = { notgouped: [] };
  defaultRouter.forEach((item) => {
    if (!item.title)
      return;
    const { title, path, icon, group } = item;
    const newItem = { title, path, icon };
    if (!group) {
      return groups['notgouped'].push(newItem);
    }
    if (groups[group])
      groups[group].push(newItem);
    else {
      groups[group] = [newItem];
    }
  });
  return groups;
};

const staticRouter = getRouter();

const mapStateToProps = (state) => ({
  router: staticRouter,
  user: state.user,
});

export default withLastLocation(withRouter(connect(mapStateToProps)(Router)));
