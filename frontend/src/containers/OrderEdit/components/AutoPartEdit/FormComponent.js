import React from 'react';
import { connect } from 'react-redux';
import { OutlinedInput, Divider, Typography } from '@material-ui/core';
import { GroupedAutocomplete } from '../../../../components/Autocomplete';
import FormController from '../../../../components/FormController';
import styles from './styles.scss';
import { formatNumber } from '../../../../helpers/utils';
import { getWarehouseAutoParts } from '../../../../actions/warehouseAutoParts';
import { warehouseAutoPartsOptionsSelector } from '../../../../selectors/warehousesAutoParts';

class OrderAutoPartFormComponent extends FormController {
  constructor(...args) {
    super(...args);
  }

  init = () => {
    const { warehouseAutoParts: { loaded, inited }, getWarehouseAutoParts } = this.props;
    if (!loaded && !inited || !this.inited) getWarehouseAutoParts();
    this.setState({
      data: {
        quantity: 1,
      }
    });
    this.inited = true;
  }

  postChange = (field, value) => {
    if (field === 'autoPart') {
      const { data } = this.state;
      if (!value) {
        this.setState({
          data: {
            ...data,
            name: null, 
            purchase_price: null,
            warehouse_quantity: null,
          },
        });
      } else {
        const { name, purchase_price, quantity: warehouse_quantity } = value;
        const newData = {
          ...data,
          name, 
          purchase_price,
          warehouse_quantity,
        };
        
        this.setState({ data: newData});
        const { handleChange } = this.props;
        if (handleChange)
          handleChange(newData);
      }
    }
  }

  renderGroup = (fields, title = null) => {
    return (
      <div>
        { !!title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>)
        }
        <div className={styles.group}> 
          {fields}
        </div>
      </div>
    )
  }

  render() {
    const { 
      warehouseAutoParts: { loaded },
    } = this.props;
    const { data: { purchase_price, quantity } } = this.state;

    const autoPartsOptions = warehouseAutoPartsOptionsSelector(this.props);
    
    return (
      
      <form className={styles.form} autoComplete="off">
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: GroupedAutocomplete,
            field: "autoPart",
            label: "Запчасть (склад)",
            defaultValue: null,
            options: autoPartsOptions,
            getOptionLabel: (option) => `${option.name} (${option.warehouse.name})`,
            getOptionSelected: (option, value) => option.id === value.id,
            altValue: true,
            hideLabel: true,
            width: '100%',
            containerStyles: styles.autopart,
            disabled: !loaded,
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "name",
            label: "Наименование",
            disabled: true,
            containerStyles: styles.name,
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "warehouse_quantity",
            label: "Доступно на складе",
            disabled: true,
            containerStyles: styles.warehouse_quantity,
          }),
        ])}
        <Divider />
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "purchase_price",
            type: "number",
            label: "Стоимость",
            disabled: true,
            containerStyles: styles.purchase_price,
            endAdornment: (<div>р.</div>),
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "quantity",
            type: "number",
            label: 'Количество',
            containerStyles: styles.quantity,
          }),
        ], "Цена")}
        { !!purchase_price && !!quantity && (
          <div className={styles.price}>
            <Typography variant="h6" gutterBottom>
              Сумма: {formatNumber(purchase_price * quantity)} р.
            </Typography>
          </div>
        )}
        
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
  warehouseAutoParts: state.warehouseAutoParts,
});

const mapDispatchToProps = {
  getWarehouseAutoParts,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAutoPartFormComponent);
