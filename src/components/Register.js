import React, {useState} from "react";
import {Link} from "react-router-dom";

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
      <h2 className="sign__title">Create account</h2>
      <label htmlFor="" className='sign__field'>
        <input type="email" onChange={handleChangeEmail} className='sign__input' placeholder='Email' required/>
      </label>
      <label htmlFor="" className='sign__field'>
        <input type="password" onChange={handleChangePassword} className='sign__input' placeholder='Password' required/>
      </label>
      <button type='submit' className="sign__button">Sign up</button>
      <div className='sign-up__container'>
        <p className="sign-up__text">Already have an account?</p>
        <Link to='/sign-in' className='sign-up__link'>Sign in</Link>
      </div>
    </form>
  )
}

export default Register;
