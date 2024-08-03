import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import Context from '../context/Context';
import getUserData from '../services/getUserData';
import postLogin from '../services/postLogin';
import '../styles/login.css';

function Login() {
  const {
    loginIsValid, setLoginIsValid, setUser,
  } = useContext(Context);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isBtnDisable, setIsBtnDisabled] = useState(true);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, status } = await postLogin(credentials);
    if (status === 200) {
      const { data: userData } = await getUserData(credentials.email, data.token);
      setUser(userData);
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('userData', JSON.stringify(userData));
      setLoginIsValid(true);
      history.push('/home');
    } else {
      setLoginIsValid(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const isCredentialsValid = [
      credentials.password.length > 5,
      emailRegex.test(credentials.email),
    ].every(Boolean);
    if (isCredentialsValid) setIsBtnDisabled(false);
    else setIsBtnDisabled(true);
  }, [credentials]);

  return (
    <div className="container">
      <main className="home-credentials">
        <header>
          <h1>{'<Login />'}</h1>
        </header>
        <form
          className="form-credentials"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">
            <AiOutlineMail fontSize={22} />
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="off"
              value={credentials.email}
              onChange={(e) => handleChange(e)}
              id="email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            <RiLockPasswordLine fontSize={22} />
            <input
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={credentials.password}
              onChange={(e) => handleChange(e)}
              id="password"
              name="password"
            />
          </label>
          <button
            type="submit"
            disabled={isBtnDisable}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => history.push('/signup')}
          >
            Signup
          </button>
        </form>
        {!loginIsValid && <Alert />}
      </main>
    </div>
  );
}

export default Login;
