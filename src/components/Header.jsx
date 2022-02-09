import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  

  render() {
    const { email, totalExpenses } = this.props;
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
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
