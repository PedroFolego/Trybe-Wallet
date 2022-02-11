import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Header.css';

class Header extends React.Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <header className="header">

        <h2 data-testid="email-field" className="user">
          Usuário:
          {' '}
          blablabla
          {email}
        </h2>
        <div className="total__expense">
          <p data-testid="total-field">
            Gasto Total R$
            {' '}
            {totalExpenses.toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};
