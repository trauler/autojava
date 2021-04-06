import React, { useState, useEffect } from 'react';
import { push } from 'connected-react-router';
import Form from '../Form';
import { Paper, Stepper, Step, StepButton, Button, Snackbar, StepLabel, Typography, Toolbar, CircularProgress } from '@material-ui/core';
import { stepSelector, stepFormSelector, stepLabelSelector } from './selectors';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { saveMultiStepFormData } from '../../actions/multiStepsForm';
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Snack({ open, autoHideDuration = 3000, onClose, severity, message, anchorOrigin = { vertical: 'top', horizontal: 'center' } }) {
  const classes = useStyles();
  return (
    <Snackbar className={classes.snack} open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={anchorOrigin}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}

const useStyles = makeStyles((theme) => ({
  header_title: {
    padding: theme.spacing(2),
  },
  header_toolbar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  header_toolbar_group: {
    '& button': {
      marginLeft: theme.spacing(2)
    }
  },
  header_btn_save: {
    minWidth: '122px',
  },
  header_btn_saveAexit: {
    minWidth: '196px',
  },
  paper_mt: {
    marginTop: theme.spacing(4),
  },
  toolbar_button: {
    marginLeft: '10px',
  },
  hide: {
    opacity: 0,
  },
  snack: {
    marginTop: theme.spacing(8)
  },
  loader: {
    color: theme.palette.primary.contrastText,
  }
}));

function MultiStepsForm({ steps, config, data: propData, saveMultiStepFormData, multiStepsForm, push }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({});
  const [snack, setSnack] = useState({ open: false });
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [saveCompletedCallbacks, setSaveCompletedCallbacks] = useState([]);
  
  const step = stepSelector({ steps, activeStep });

  const preparePropData = () => {
    const preparedData = { ...propData };
    steps.forEach((step) => {
      const { name, dataParser } = step;
      if (dataParser && propData[name])
        preparedData[name] = dataParser(propData[name]);
    });
    return preparedData;
  };

  const parseStepData = (step, data) => {
    const { dataParser } = steps[step];
    if (dataParser)
      return dataParser(data);
    else
      return data;
  }

  const getFullDataName = (index = activeStep) => {
    const { name } = steps[index];
    const { rootName } = config; 
    return `${ rootName ? rootName : ''}${ name ? name : 'default'}`;
  };

  const getStepMultiFormData = (index = activeStep) => {
    return multiStepsForm[getFullDataName(index)];
  }
  
  useEffect(() => {
    setData(preparePropData());
  }, [propData]);
  
  useEffect(() => {
    if (loading) {
      const multiStepsData = getStepMultiFormData(loadingStep);
      if (multiStepsData) {
        const { loaded, error, stepLabel, data } = multiStepsData;
        if (loaded) {
          setStepData(loadingStep, parseStepData(loadingStep, data));
          setLoading(false);
          setSnack({
            open: true,
            onClose: handleSnackClose,
            severity: error ? 'error' : 'success',
            message:  error ? `При сохранении шага "${stepLabel}" произошла ошибка` : `Шаг "${stepLabel}" сохранен`,
          });
          if (!error) executeSaveCallbacks();
        }
      }
    }
  }, [multiStepsForm]);
  
  const setStepData = (step = activeStep, stepData) => {
    const { name } = steps[step];
    const newData = { ...data };
    newData[name] = stepData;
    setData(newData);
  };
  
  const handleChange = (stepData) => {
    setStepData(activeStep, stepData);
  };

  const saveData = (callback) => {
    setLoading(true);
    setLoadingStep(activeStep);
    const { name, saveDataFormatter = ((a) => a), apiPath, label } = step;
    const { rootApi } = config; 
    
    saveMultiStepFormData({
      config: {
        name: getFullDataName(),
        endpoint: `${rootApi}${apiPath}`,
        stepLabel: label,
      },
      data: saveDataFormatter(data[name]),
    });
    if (callback)
      callback();
  };

  const handleSaveAndExit = () => {
    saveData();
    setSaveCompletedCallbacks([handleExit]);
  };

  const handleExit = () => {
    const { exitPath } = config; 
    push(exitPath);
  };

  const executeSaveCallbacks = () => {
    if (saveCompletedCallbacks && saveCompletedCallbacks.length)
      saveCompletedCallbacks.forEach((callback) => callback());
  };

  const totalSteps = () => {
    return steps.length;
  };

  const isFirstStep = () => {
    return activeStep === 0;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    if (!isLastStep())
      saveData(() => setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    if (!isFirstStep())
      saveData(() => setActiveStep(activeStep - 1));
  };

  const handleSetStep = (newStep) => () => {
    if (newStep !== activeStep)
      saveData(() => setActiveStep(newStep));
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ open: false });
  };

  const isActiveStepLoading = loading && loadingStep === activeStep;

  const headerToolbar = (
    <div>
      <Button 
        key="prev-step" 
        variant="contained" 
        color="primary" 
        onClick={handleBack}
        className={clsx(classes.toolbar_button, isFirstStep() && classes.hide)}
        disabled={isFirstStep() || isActiveStepLoading}
      >
        Назад
      </Button>
      <Button 
        key="next-step" 
        variant="contained" 
        color="primary" 
        onClick={handleNext}
        className={clsx(classes.toolbar_button, isLastStep() && classes.hide)}
        disabled={isLastStep() || isActiveStepLoading}
      >
        Далее
      </Button>
    </div>
  );

  const footerToolbar = null;

  
  return (
    <React.Fragment>
      <Paper elevation={3}>
        <Typography variant="h5" color="primary" className={classes.header_title}>
          Редактирование заказ-наряда
        </Typography>
        <Toolbar className={classes.header_toolbar}>
          <Button key="exit" variant="contained" color="primary" onClick={handleExit}>Завершить</Button>
          <div key="save-group" className={classes.header_toolbar_group}>
            <Button key="save-exit" variant="contained" color="primary" onClick={() => handleSaveAndExit()} className={classes.header_btn_saveAexit} disabled={isActiveStepLoading}>
              { !isActiveStepLoading ? 'Сохранить и выйти' : (<CircularProgress className={classes.loader} size={24}/> )}
            </Button>
            <Button key="save" variant="contained" color="primary" onClick={() => saveData()} className={classes.header_btn_save} disabled={isActiveStepLoading}>
              { !isActiveStepLoading ? 'Сохранить' : (<CircularProgress className={classes.loader} size={24}/> )}
            </Button>
          </div>
        </Toolbar>
      </Paper>
      <Paper elevation={3}  className={classes.paper_mt}>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((step, index) => {
            const { label } = step;
            const stepProps = {};
            const labelProps = {};
            const multiStepsData = getStepMultiFormData(index);
            if (multiStepsData) {
              const { loaded, error } = multiStepsData;
              if (loaded) {
                if (error) {
                  labelProps.error = activeStep !== index;
                } else {
                  stepProps.completed = activeStep !== index;
                }
              }
            }
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={handleSetStep(index)}
                  disabled={isActiveStepLoading}
                >
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Paper>
      <Paper elevation={3} className={classes.paper_mt}>
        <Form 
          headerToolbar={headerToolbar} 
          footerToolbar={footerToolbar} 
          hideSave={true} 
          form={stepFormSelector({ step })}
          label={stepLabelSelector({ step })}
          handleChange={handleChange}
          formData={data[step.name]}
          disabled={isActiveStepLoading}
        />
      </Paper>
      <Snack {...snack}/>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  multiStepsForm: state.multiStepsForm,
});

const mapDispatchToProps = {
  saveMultiStepFormData,
  push,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultiStepsForm);


