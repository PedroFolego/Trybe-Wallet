import React from 'react';
import { connect } from 'react-redux';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
    };
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    console.log(expenses);
    const sum = expenses.reduce((acc, expense) => acc + (Number(expense.value) * expense.exchangeRates[expense.currency].ask), 0);
    console.log(sum);
    this.setState({ totalExpenses: sum });
  }

  render() {
    const { totalExpenses } = this.state;
    return (
      <div>
        TrybeWallet
        <Header totalExpenses={ totalExpenses } />
        <ExpensesForm sumExpenses={ this.sumExpenses } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
