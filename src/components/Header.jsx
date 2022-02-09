import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpenses: 0,
    }
  }
  sumExpenses = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, expense) => acc + (Number(expense.value) * expense.currency), 0);

    console.log(sum);
  }

  render() {
    const { totalExpenses } = this.state;
    const { email } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">{email}</h2>
        <p data-testid="total-field">{totalExpenses}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
