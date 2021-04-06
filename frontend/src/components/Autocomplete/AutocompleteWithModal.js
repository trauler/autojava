import React from 'react';
import Grouped from './Grouped';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  block: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function AutocompleteWithModal({ 
  modal: Modal, 
  formDataParser = (data) => data, 
  value, 
  onChange, 
  disabled,
  ...props 
}) {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Grouped {...props} onChange={onChange} value={value} disabled={disabled}/>
      <Modal {...props} formItem={formDataParser(value)} onSave={(item) => onChange({ target: { value: item }})} disabled={disabled}/>
    </div>
  );
}