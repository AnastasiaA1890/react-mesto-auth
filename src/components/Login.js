import React, {useState} from "react";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault()
    props.handleLogin({email, password})
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <form className="sign__form" onSubmit={handleSubmit}>
      <h2 className="sign__title">Welcome</h2>
      <label htmlFor="" className='sign__field'>
        <input id='email' onChange={handleChangeEmail} type="text" className='sign__input' placeholder='Email' required/>
      </label>
      <label htmlFor="" className='sign__field'>
        <input id='password' onChange={handleChangePassword} type="password" className='sign__input' placeholder='Password' required/>
      </label>
      <button type='submit' className="sign__button">Sign in</button>
    </form>
  )
}

export default Login;
