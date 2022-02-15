import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense } from '../actions';
import '../style/ExpensesForm.css';

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
    this.setExpenseToState();
  }

  setExpenseToState = () => {
    const { catchExpense } = this.props;

    this.setState({ ...catchExpense });
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  onSubmit = async () => {
    const {
      expenses,
      sumExpenses,
      saveExpense,
      componentChangeExpense,
    } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const expenseToChange = expenses.find((expense) => expense.id === id);
    expenseToChange.value = value;
    expenseToChange.description = description;
    expenseToChange.currency = currency;
    expenseToChange.method = method;
    expenseToChange.tag = tag;

    // expenseToChange = { ...this.state };
    await saveExpense(expenses);
    await sumExpenses();
    componentChangeExpense();
  }

  render() {
    const { exchangeRates, value, description, currency, method, tag } = this.state;
    return (
      <form className="forms__expenses">
        <label htmlFor="value">
          <span>Valor Gasto</span>
          <input
            className="form-control form-control-sm"
            type="text"
            name="value"
            onChange={ this.handleChange }
            id="value"
            value={ value }
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          <span>Descrição</span>
          <input
            className="form-control form-control-sm"
            type="text"
            name="description"
            onChange={ this.handleChange }
            id="description"
            value={ description }
            data-testid="description-input"
          />
        </label>
        <label htmlFor="method">
          <span>Forma de pagamento</span>
          <select
            className="form-select form-select-sm"
            id="method"
            value={ method }
            name="method"
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <span>Marcação</span>
          <select
            className="form-select form-select-sm"
            id="tag"
            value={ tag }
            name="tag"
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="currency">
          <span>Moeda</span>
          <select
            className="form-select form-select-sm"
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
        <button
          className="btn btn-success "
          type="button"
          onClick={ this.onSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (payload) => dispatch(addExpense(payload)),
});

const mapStateToProps = ({ wallet }) => ({
  catchExpense: wallet.alterateExpense,
  expenses: wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);

ExpensesForm.propTypes = {
  componentChangeExpense: PropTypes.func.isRequired,
  catchExpense: PropTypes.objectOf(PropTypes.any).isRequired,
  saveExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  sumExpenses: PropTypes.func.isRequired,
};
