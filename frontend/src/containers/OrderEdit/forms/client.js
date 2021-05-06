import React from 'react';
import { connect } from 'react-redux';
import { AutocompleteWithModal } from '../../../components/Autocomplete';
import FormController from '../../../components/FormController';
import { getClients, getClientCars } from '../../../actions/clients';
import { clientsSelector, clientCarsSelector } from '../../../selectors/clients';
import { parseClientFromOption } from '../../../helpers/utils';
import { ClientEditModal } from '../../ClientEdit';
import { CarEditModal } from '../../CarEdit';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
  form: {
    padding: '20px 10%',
  }
});

class OrderClientForm extends FormController {
  constructor(...args) {
    super(...args);
  }

  init = () => {
    const { clients: { loaded, inited }, getClients } = this.props;
    if (!inited && !loaded && !this.inited) getClients();
    this.inited = true;
  }

  postUpdate = (newProps) => {
    if (newProps) {
      const { data: { client: { id } = {} } = {} } = this.state
      if (id) {
        const { getClientCars } = this.props;
        getClientCars(id);
      }
    }
  }
  
  postChange = (field, value) => {
    if (field === "client") {
      if (value) {
        const { getClientCars } = this.props;
        const { id } = value;
        getClientCars(id);
      }
    }
    return;
  }

  renderFields = () => {
    const { clients } = this.props;
    const { loaded, carsLoaded } = clients;
    const clientsOptions = clientsSelector(clients);

    let carsOptions = [];
    let clientId = null;
    const { data: { client } = {} } = this.state;
    if (client) {
      const { id } = client;
      if (id) {
        carsOptions = clientCarsSelector({ id, clients });
        clientId = id;
      }
    }

    return [
      this.renderFieldWithValidator({
        FieldComponent: AutocompleteWithModal,
        modal: ClientEditModal,
        formDataParser: parseClientFromOption,
        field: "client",
        label: "Клиент",
        defaultValue: null,
        options: clientsOptions,
        groupBy: (option) => option.firstLetter,
        getOptionLabel: (option) => option.title,
        getOptionSelected: (option, value) => (option.vid === value.vid && option.id === value.id),
        altValue: true,
        hideLabel: true,
        disabled: !loaded,
      }),
      this.renderFieldWithValidator({
        FieldComponent: AutocompleteWithModal,
        modal: CarEditModal,
        // formDataParser: parseClientFromOption,
        field: "car",
        label: "Автомобиль",
        defaultValue: null,
        options: carsOptions,
        getOptionLabel: (option) => `${option.brand} ${option.model}${ option.plate ? ` (${option.plate})` : ''}`,
        getOptionSelected: (option, value) => option.vid === value.vid,
        altValue: true,
        hideLabel: true,
        disabled: !carsLoaded || !client,
        config: { clientId: clientId },
      }),
    ];
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form}>
        {this.renderFields()}
      </form>
    );
  };
}

const mapStateToProps = (state) => ({
  clients: state.clients,
});

const mapDispatchToProps = {
  getClients,
  getClientCars,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderClientForm));
