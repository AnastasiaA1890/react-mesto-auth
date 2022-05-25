import React, {useState} from "react";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    props.handleRegister({email, password})
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return(
    <form className="sign__form" onSubmit={handleSubmit}>
      <h2 className="sign__title">Регистрация</h2>
      <label htmlFor="" className='sign__field'>
        <input type="email" onChange={handleChangeEmail} className='sign__input' placeholder='Email' required/>
      </label>
      <label htmlFor="" className='sign__field'>
        <input type="password" onChange={handleChangePassword} className='sign__input' placeholder='Пароль' required/>
      </label>
      <button type='submit' className="sign__button">Зарегистрироваться</button>
      <div className='sign-up__container'>
        <p className="sign-up__text">Уже зарегистрированы?</p>
        <a href="/sign-in" className='sign-up__link'>Войти</a>
      </div>
    </form>
  )
}

export default Register;
