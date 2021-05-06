import React, { Component } from 'react';
import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import styles from './styles.scss';
import { isEqual } from 'lodash-es';
import clsx from 'clsx';

class FormController extends Component {
  constructor(...args) {
    super(...args);
    this.validators={};
    this.formatters={};
    this.state = {
      data: {},
      touched: {},
      errors: {},
    };
    this.inited = false;
  }

  componentDidMount() {
    this.init();
    const { formItem } = this.props;
    if (formItem) this.setState({ data: formItem }, () => { this.formValidate(); this.postUpdate(true) });
  }

  componentDidUpdate(prevProps) {
    const { formItem: prevFormItem } = prevProps;
    const { formItem } = this.props;
    if (!isEqual(formItem, prevFormItem)) {
      this.setState({ data: formItem }, () => this.postUpdate(true));
    } else {
      this.postUpdate(false)
    }
  }

  postUpdate = (newProps) => {
    return;
  }
  
  init = () => {
    this.inited = true;
  }

  setFieldValue = (field, value) => {
    const { data } = this.state;
    data[field] = value;
    this.setState(data);
  }

  getFieldValue = (field) => {
    const { data } = this.state;
    return data[field] || '';
  }

  setFieldError = (field, error) => {
    const { errors } = this.state;
    errors[field] = error;
    this.setState(errors);
  }

  getFieldError = (field) => {
    const { errors } = this.state;
    return errors[field];
  }

  setFieldBlur = (field) => {
    const { touched } = this.state;
    touched[field] = true;
    this.setState(touched);
  }

  getFieldBlur = (field) => {
    const { touched } = this.state;
    return touched[field];
  }

  formValidate = () => {
    const { data } = this.state;
    const errors = {};
    Object.keys(this.validators).forEach((field) => {
      const error = this.validators[field](data[field]);
      if (error) errors[field] = error;
    });
    const { handleValid } = this.props;
    if (handleValid)
      handleValid(!Object.keys(errors).length);
    this.setState({ errors });
  }

  handleChange = (field, nfvalue) => {
    const { data, errors: oldErrors } = this.state;
    const errors = {...oldErrors};
    let error = undefined;
    let value = nfvalue;
    const formatter = this.formatters[field];
    if (formatter) {
      value = formatter(value);
    };
    data[field] = value;
    const validator = this.validators[field];
    if (validator) {
      error = validator(value);
    };
    if (error)
      errors[field] = error;
    else
      delete errors[field];
    const { handleChange, handleValid } = this.props;
    if (handleChange)
      handleChange(data);
    if (handleValid)
      handleValid(!Object.keys(errors).length);

    this.setState({ data, errors });
    this.postChange(field, value);
  }

  postChange = (field, value) => {
    return;
  }

  handleBlur = (field) => {
    this.setFieldBlur(field);
  }

  renderFieldWithValidator = ({ 
    FieldComponent, 
    validator, 
    field, 
    label, 
    hideLabel, 
    altValue, 
    defaultValue = '',
    key,
    containerStyles,
    config,
    formatter,
    required,
    ...props 
  }) => {
    if (validator) this.validators[field] = validator;
    if (formatter) this.formatters[field] = formatter;
    const error = this.getFieldError(field);
    const touched = this.getFieldBlur(field);
    const addedProps = {};
    // if (!altValue) addedProps['value'] = this.getFieldValue(field);
    const formattedLabel = `${label}${required ? ' *' : ''}`;
    return (
      <div key={key || field} className={clsx(styles.item, containerStyles)}>
        <FormControl error={!!error && touched} variant="outlined" className={styles.form_control}>
          <InputLabel htmlFor={field}>{!hideLabel ? formattedLabel : ''}</InputLabel>
          <FieldComponent 
            id={field}
            label={formattedLabel}
            value={this.getFieldValue(field) || defaultValue}
            onChange={(event) => this.handleChange(field, event.target.value)} 
            onBlur={(event) =>this.handleBlur(field, event.target.value)}
            config={config}
            {...addedProps}
            {...props}
          />
          <FormHelperText id={field}>{touched && error || ' '}</FormHelperText>
        </FormControl>
      </div>
    );
  };

  renderFields = () => {
    return [(<div key="noset">Form fields not set</div>)]
  }

  render() {
    return (
      <form className={styles.form}>
        {this.renderFields()}
      </form>
    );
  };
}

export default FormController;

