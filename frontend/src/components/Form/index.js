import React from 'react';
import { Typography, Divider, Toolbar, Button } from '@material-ui/core';
import styles from './styles.scss';
import { cntcl } from '../../helpers/app';

function Form({ label = 'Форма', form: FormComponent, headerToolbar, footerToolbar, hideSave = false, disabled, formData, ...props}) {
  if (!FormComponent)
    return <div>Form Component not found!</div>;
  return (
    <>
      <div className={styles.header}>
        <Typography variant="h2" color="primary" classes={cntcl('root',styles.title)}>
          {label}
        </Typography>
        <Toolbar>
          {headerToolbar}
        </Toolbar>
      </div>
      <Divider />
      <FormComponent formItem={formData} formData={formData} {...props}/>
      { (footerToolbar || !hideSave) && (
        <React.Fragment>
        <Divider />
        <div className={styles.footer}>
          <Toolbar>
            {footerToolbar}
            { !hideSave 
              ? <Button key="prev-step" variant="contained" color="primary" className={styles.btn_save} disabled={disabled}>Сохранить</Button>
              : null}
          </Toolbar>
        </div>
        </React.Fragment>
      )}
    </>
  )
}

export default Form;
