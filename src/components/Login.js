import React from 'react';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({
      email: email,
      password: password,
    });
  }

  return (
    <div className="auth">
      <div className="auth__container">
        <form className="form" name={props.name} onSubmit={handleSubmit}>
          <h2 className="form__title form__title_light auth__title">Вход</h2>
          <input type="email" className="form__field form__field_light" placeholder="Email" name="login-email" required minLength="2" maxLength="40" value={email || ''} onChange={handleChangeEmail} />
          <span className="form__error-message login-email-error"></span>
          <input type="password" className="form__field form__field_light" placeholder="Пароль" name="login-password" required minLength="2" maxLength="200" value={password || ''} onChange={handleChangePassword} />
          <span className="form__error-message login-password-error"></span>
          <button type="submit" className="form__save-button form__save-button_light auth__submit-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
