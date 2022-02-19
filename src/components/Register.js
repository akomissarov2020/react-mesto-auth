import React from 'react';
import AuthForm from './AuthForm';

function Register(props) {
    return (
      <>
        <AuthForm 
          name={props.name}
          handleSubmit={props.handleSubmit}
          formTitleText="Регистрация"
          formButtonText="Зарегистрироваться"
          formAdditionalText="Уже зарегистрированы? Войти"
        />
      </>
    );
  }
  
  export default Register;
  