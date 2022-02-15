import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Expense from './Expense';
import '../style/TableExpenses.css';

class TableExpenses extends React.Component {
  render() {
    const { expenses, sumExpenses, componentChangeExpense } = this.props;
    return (
      <>
        <table>
          <tbody>
            <tr className="header__table">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </tbody>
        </table>
        {expenses.map((expense) => (
          <Expense
            key={ expense.id }
            expense={ expense }
            sumExpenses={ sumExpenses }
            componentChangeExpense={ componentChangeExpense }
          />
        ))}
      </>
    );
  }
}
const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

export default connect(mapStateToProps)(TableExpenses);

TableExpenses.propTypes = {
  componentChangeExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  sumExpenses: PropTypes.func.isRequired,
};
