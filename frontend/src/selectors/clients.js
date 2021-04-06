import { createSelector } from 'reselect';
import { sortBy } from 'lodash-es';
import { formatClientData } from '../helpers/data';

const getId = ({ id }) => id;
const getItems = ({ items }) => items;
const getClientsState = ({ clients }) => clients;
const getData = ({ data }) => data;

const clientsSelector = createSelector(
  getItems,
  (items) => {
    if (!items || !items.length)
      return [];
    
    return sortBy(
      items.map((item) => formatClientData(item)), 
      (item) => { return item.surname; }
    );
  }
);

const clientCarsSelector = createSelector(
  getId,
  getClientsState,
  (id, clients) => {
    const { carsItems } = clients;
    const items = carsItems[id];
    
    if (!items || !items.length)
      return [];
    
    return sortBy(
      items,
      (item) => { return item.brand; }
    );
  }
);

clientCarsSelector

const clientInfoSelector = createSelector(
  getData,
  (data) => {
    const { name, surname, middleName, phone, email, car, carVin } = data;
    return {
      name,
      surname,
      middle_name: middleName,
      phone,
      email,
      car,
      car_vin: carVin
    };
  }
);

export {
  clientsSelector,
  clientCarsSelector,
  clientInfoSelector,
};