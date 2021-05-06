import { createSelector } from 'reselect';

const getApiRoot = () => __API_ROOT__;

const getAuthUrl = () => `${getApiRoot()}/login`;
const getClientsUrl = (id) => `${getApiRoot()}/clients${ id ? `/${id}` : '' }`;
const getClientCarsUrl = (id, carId) => `${getClientsUrl(id)}/cars${ carId ? `/${carId}` : '' }`;
const getOptionalAccessoriesUrl = (id) => `${getApiRoot()}/optional-accessories${ id ? `/${id}` : '' }`;
const getServicesUrl = (id) => `${getApiRoot()}/services${ id ? `/${id}` : ''}`;
const getServiceTypesUrl = (id) => `${getApiRoot()}/service-types${ id ? `/${id}` : ''}`;
const getUsersUrl = (id) => `${getApiRoot()}/users${ id ? `/${id}` : ''}`;
const getAutoNodesUrl = (id) => `${getApiRoot()}/auto-nodes${ id ? `/${id}` : ''}`;
const getAutoPartsUrl = (id) => `${getApiRoot()}/auto-parts${ id ? `/${id}` : ''}`;
const getWarehousesUrl = (id) => `${getApiRoot()}/warehouses${ id ? `/${id}` : ''}`;
const getWarehouseAutoPartsUrl = (id) => `${getApiRoot()}/warehouse-auto-parts${ id ? `/${id}` : ''}`;
const getWorkshopsUrl = (id) => `${getApiRoot()}/workshops${ id ? `/${id}` : ''}`;
const getWorkshopStationsUrl = (workshopId, id) => `${getApiRoot()}/workshops/${workshopId}/stations${ id ? `/${id}` : ''}`;


const getOrdersUrl = (id) => `${getApiRoot()}/orders${ id ? `/${id}` : '' }`;

export {
  getApiRoot,
  getAuthUrl,
  getClientsUrl,
  getClientCarsUrl,
  getOptionalAccessoriesUrl,
  getServicesUrl,
  getServiceTypesUrl,
  getUsersUrl,
  getAutoNodesUrl,
  getAutoPartsUrl,
  getWarehousesUrl,
  getWarehouseAutoPartsUrl,
  getWorkshopsUrl,
  getWorkshopStationsUrl,
  getOrdersUrl,
};
