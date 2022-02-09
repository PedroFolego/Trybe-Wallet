// Coloque aqui suas actions
export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addLogin = (payload) => ({
  type: ADD_LOGIN,
  email: payload.email,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  expense: payload,
});
