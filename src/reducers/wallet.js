import {
  ADD_EXPENSE,
  ADD_EXPENSE_CHANGE,
  ADD_SUM_EXPENSES,
  CHANGE_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  alterateExpense: {},
};

const walletReducer = (state = INITIAL_STATE, option) => {
  switch (option.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, option.expense] };
  case ADD_SUM_EXPENSES:
    return { ...state, totalExpenses: option.sum };
  case REMOVE_EXPENSE:
    return { ...state, expenses: option.expenses };
  case CHANGE_EXPENSE:
    return { ...state, alterateExpense: option.expense };
  case ADD_EXPENSE_CHANGE:
    return { ...state, expenses: option.expenses };
  default:
    return state;
  }
};

export default walletReducer;
