import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormController from '../../components/FormController';
import { withStyles } from '@material-ui/styles';
import { carVinValidator } from '../../helpers/validators';
import { vinFormatter } from '../../helpers/formatters';

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 20px',
  }
});

class FormComponent extends FormController {
  constructor(...args) {
    super(...args);
  }


  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} autoComplete="off">
        {
          [
            this.renderFieldWithValidator({
              FieldComponent: OutlinedInput,
              field: "brand",
              label: "Марка",
            }),
            this.renderFieldWithValidator({
              FieldComponent: OutlinedInput,
              field: "model",
              label: "Модель",
            }),
            this.renderFieldWithValidator({
              FieldComponent: OutlinedInput,
              field: "vin",
              label: "ВИН",
              maxLength: 17,
              validator: carVinValidator,
              formatter: vinFormatter,
              required: true,
            }),
            this.renderFieldWithValidator({
              FieldComponent: OutlinedInput,
              field: "plate",
              label: "Гос. номер",
            }),
          ]
        }
      </form>
    );
  };
}

export default withStyles(styles)(FormComponent);
