import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import TableExpenses from '../components/TableExpenses';
import { sumTotalExpenses } from '../actions';
import '../style/Wallet.css';
import ChangeExpenseForms from '../components/ChangeExpenseForms';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      componentChange: false,
    };
  }

  sumExpenses = () => {
    const { expenses, addTotalExpenses } = this.props;
    const sum = expenses.reduce((acc, expense) => (
      acc + (Number(expense.value) * expense.exchangeRates[expense.currency].ask)
    ), 0);
    addTotalExpenses(sum);
  }

  componentChangeExpense= () => {
    this.setState((prev) => ({ componentChange: !prev.componentChange }));
  }

  render() {
    const { componentChange } = this.state;
    return (
      <main className="main__wallet">
        <div className="logo">
          <h1 className="trybe_wallet">
            Trybe
            <span className="wallet">Wallet</span>
          </h1>
        </div>
        <Header />
        { componentChange ? <ChangeExpenseForms
          componentChangeExpense={ this.componentChangeExpense }
          sumExpenses={ this.sumExpenses }
        /> : <ExpensesForm sumExpenses={ this.sumExpenses } />}
        <TableExpenses
          sumExpenses={ this.sumExpenses }
          componentChangeExpense={ this.componentChangeExpense }
        />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addTotalExpenses: (payload) => dispatch(sumTotalExpenses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTotalExpenses: PropTypes.func.isRequired,
};
