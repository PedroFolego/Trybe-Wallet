import coinAPI from '../api';

// Coloque aqui suas actions
export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_SUM_EXPENSES = 'ADD_SUM_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const addLogin = (payload) => ({
  type: ADD_LOGIN,
  email: payload.email,
});

const addTheExpense = (items) => ({
  type: ADD_EXPENSE,
  expense: {
    ...items.payload,
    exchangeRates: items.api,
  },
});

export const addExpense = (payload) => async (dispatch) => {
  const api = await coinAPI();
  return dispatch(addTheExpense({ payload, api }));
};

export const sumTotalExpenses = (payload) => ({
  type: ADD_SUM_EXPENSES,
  sum: payload,
});

export const removeExpense = (paylod) => ({
  type: REMOVE_EXPENSE,
  expenses: paylod,
});
