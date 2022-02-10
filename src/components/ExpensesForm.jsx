import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';
import coinAPI from '../api';

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    this.getAPI();
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  onSubmit = async () => {
    const { saveExpense, sumExpenses } = this.props;

    await saveExpense(this.state);
    await sumExpenses();
    this.setState((prev) => ({ id: prev.id + 1, value: '' }));
  }

  getAPI = async () => {
    const coins = await coinAPI();
    this.setState({ exchangeRates: coins });
  }

  render() {
    const { exchangeRates, value, currency } = this.state;
    return (
      <form>
        <label htmlFor="value">
          <input
            type="text"
            name="value"
            onChange={ this.handleChange }
            id="value"
            value={ value }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            name="description"
            onChange={ this.handleChange }
            id="description"
            data-testid="description-input"
          />
        </label>
        <select name="method" onChange={ this.handleChange } data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select name="tag" onChange={ this.handleChange } data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            onChange={ this.handleChange }
            data-testid="currency-input"
            id="currency"
            value={ currency }
            moeda="moeda"
          >
            {Object.values(exchangeRates)
              .filter((coin) => coin.codein !== 'BRLT')
              .map((coin) => (
                <option key={ coin.code } data-testid={ coin.code }>{coin.code}</option>
              ))}
          </select>
        </label>
        <button type="button" onClick={ this.onSubmit }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (payload) => dispatch(addExpense(payload)),
});

export default connect(null, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  saveExpense: PropTypes.func.isRequired,
  sumExpenses: PropTypes.func.isRequired,
};
