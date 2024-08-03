import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/alert.css';

function Alert() {
  const { setLoginIsValid } = useContext(Context);
  const history = useHistory();

  const handleClick = () => {
    setLoginIsValid(true);
    history.push('/');
  };

  return (
    <main className="alert">
      <section className="alert-content">
        <h1>Invalid credentials</h1>
        <button
          type="button"
          onClick={handleClick}
        >
          Sign in again
        </button>
      </section>
    </main>
  );
}

export default Alert;
