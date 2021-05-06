import { createSelector } from 'reselect';

const getWarehouseAutoParts = ({ warehouseAutoParts }) => warehouseAutoParts || {};

export const warehouseAutoPartsOptionsSelector = createSelector(
  getWarehouseAutoParts,
  ({ items }) => {
    return items.map((item) => {
      const { auto_part: { name } = {} } = item;
      return {
        name,
        ...item,
      }
    });
  }
);