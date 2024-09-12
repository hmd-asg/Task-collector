import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';
import './Login.css'; // Import the CSS file for the background styling

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate('/');
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h4 className="card-header p-2 text-center">Login</h4>
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <>
              <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
                <input
                  className="form-input my-3"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input my-3"
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login
                </button>
              </form>
              <div className="my-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </>
          )}

          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
