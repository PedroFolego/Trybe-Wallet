import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/Expense.css';

class Expense extends React.Component {
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
          <button className="btn btn-outline-warning" type="button">
            Editar/excluir
          </button>
        </span>
      </div>
    );
  }
}

export default connect()(Expense);

Expense.propTypes = {
  expense: PropTypes.objectOf(PropTypes.any).isRequired,
};
