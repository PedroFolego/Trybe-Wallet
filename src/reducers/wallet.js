import { ADD_EXPENSE } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
};

const walletReducer = (state = INITIAL_STATE, option) => {
  switch (option.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, option.expense] };
  default:
    return state;
  }
};

export default walletReducer;
