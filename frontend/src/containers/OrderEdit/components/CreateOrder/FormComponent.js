import React from 'react';
import { connect } from 'react-redux';
import { GroupedAutocomplete } from '../../../../components/Autocomplete';
import FormController from '../../../../components/FormController';
import styles from './styles.scss';
import { getWorkshops } from '../../../../actions/workshops';

class FormComponent extends FormController {
  constructor(...args) {
    super(...args);
  }

  init = () => {
    const { workshops: { loaded, inited }, getWorkshops } = this.props;
    if (!inited && !loaded && !this.inited) getWorkshops();
    this.inited = true;
  }

  render() {
    const { workshops: { loaded, items } } = this.props;
    
    return (
      
      <form className={styles.form} autoComplete="off">
        {
          this.renderFieldWithValidator({
            FieldComponent: GroupedAutocomplete,
            field: "workshop",
            label: "Мастерская",
            defaultValue: null,
            options: items,
            getOptionLabel: (option) => option.name,
            getOptionSelected: (option, value) => option.id === value.id,
            altValue: true,
            hideLabel: true,
            width: '100%',
            containerStyles: styles.autopart,
            disabled: !loaded,
          })
        }
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
  workshops: state.workshops,
});

const mapDispatchToProps = {
  getWorkshops,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
