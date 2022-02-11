import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Expense.css';
import { removeExpense } from '../actions';

class Expense extends React.Component {
  removeExpense = async () => {
    const { expenses, deleteExpense, sumExpenses, expense: { id } } = this.props;
    const removedExpense = expenses.filter((expense) => expense.id !== id);
    await deleteExpense(removedExpense);
    sumExpenses();
  }

  render() {
    const { expense: {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    } } = this.props;

    return (
      <div className="expense">
        <span role="cell">{description}</span>
        <span role="cell">{tag}</span>
        <span role="cell">{method}</span>
        <span role="cell">{Number(value).toFixed(2)}</span>
        <span role="cell">{exchangeRates[currency].name}</span>
        <span role="cell">{Number(exchangeRates[currency].ask).toFixed(2)}</span>
        <span role="cell">
          {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
        </span>
        <span role="cell">Real</span>
        <span role="cell">
          <button
            className="btn btn-outline-warning"
            data-testid="delete-btn"
            type="button"
          >
            <i className="fa-solid fa-pen-to-square" />
          </button>
          <button
            className="btn btn-outline-danger"
            data-testid="edit-btn"
            type="button"
            onClick={ this.removeExpense }
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(removeExpense(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expense);

Expense.propTypes = {
  sumExpenses: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  expense: PropTypes.objectOf(PropTypes.any).isRequired,
};
