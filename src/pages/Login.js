import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disableLoginBtn: true,
    };
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value },
    () => this.validateLogin());

  // Fiz a validação do email usando essas referências
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  validateLogin = () => {
    const { email, password } = this.state;

    const regex = /\S+@\S+\.\S+/;
    const isValidEmail = regex.test(email);

    const MIN_CHARACTER = 5;
    const isValidPassword = password.length > MIN_CHARACTER;

    if (isValidEmail && isValidPassword) {
      this.setState({ disableLoginBtn: false });
    } else {
      this.setState({ disableLoginBtn: true });
    }
  }

  onSubmit = () => {
    const { saveLogin, history } = this.props;
    saveLogin(this.state);
    history.push('/carteira');
  }

  render() {
    const { disableLoginBtn, email, password } = this.state;

    return (
      <main>
        <h1>Login</h1>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            type="text"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
            type="text"
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ disableLoginBtn }
          onClick={ this.onSubmit }
        >
          Entrar
        </button>
      </main>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveLogin: (payload) => dispatch(addLogin(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveLogin: PropTypes.func.isRequired,
};
