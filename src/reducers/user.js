// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, option) => {
  switch (option.type) {
  case ADD_LOGIN:
    return { ...state, email: option.email };
  default:
    return state;
  }
};

export default userReducer;
