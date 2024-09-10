import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate('/');
    }
  }, [])

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 w-50 mx-auto">
      <div className='my-3'>
                Ready to transform chaos into clarity? Dive into the world of effortless organization where your projects and tasks come to life. Whether you’re juggling a thousand to-dos or just getting started, Task Collector is your go-to hub for seamless project management.
              </div>
      <div className="card">
        <h4 className="card-header p-2 text-center">Login</h4>
        <div className="card-body">
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <>
              <form className='d-flex flex-column' onSubmit={handleFormSubmit}>
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
              <div className='my-3'>
                Don't have an account? <Link to='/signup'> Sign up</Link>
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
    </main>
  );
};

export default Login;
