import React from 'react';
import { OutlinedInput, Divider } from '@material-ui/core';
import FormController from '../../components/FormController';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  form: {
    padding: '0 20px',
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
});

class FormComponent extends FormController {
  constructor(...args) {
    super(...args);
  }

  renderGroup = (fields) => {
    const { classes } = this.props;
    return (
      <div className={classes.group}> 
        {fields}
      </div>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form} autoComplete="off">
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "name",
            label: "Имя",
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "surname",
            label: "Фамилия",
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "middleName",
            label: "Отчество",
          }),
        ])}
        <Divider />
        {this.renderGroup([
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "phone",
            label: "Телефон",
          }),
          this.renderFieldWithValidator({
            FieldComponent: OutlinedInput,
            field: "email",
            label: "E-mail",
          }),
        ])}
      </form>
    );
  };
}

export default withStyles(styles)(FormComponent);
