import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { QUERY_ME } from '../utils/queries.js';
import { UPDATE_USER } from '../utils/mutations.js';
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate();
    const { loading, data } = useQuery(QUERY_ME);
    const [erroMessage, setErrorMessage] = useState(false);
    const [formState, setFormState] = useState({
        username: data?.me?.username || '',
        email: data?.me?.email || '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!Auth.loggedIn()) {
            navigate('/login');
        }
    }, []);

    const [updateUser, { error }] = useMutation(UPDATE_USER, {
        refetchQueries: { query: QUERY_ME }
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, email, password, confirmPassword } = formState;
            if (password !== confirmPassword) {
                setErrorMessage(true);
                return;
            }
            else {

                await updateUser({ variables: { username, email, password } });
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className="flex-row justify-center mb-4 w-50 mx-auto">
            <div className="card">
                <h4 className="card-header text-center p-2">Update</h4>
                <div className="card-body">
                    <form className='d-flex flex-column' onSubmit={handleFormSubmit}>
                        <input
                            className="form-input my-3"
                            placeholder="Your username"
                            name="username"
                            type="text"
                            value={formState.username}
                            onChange={handleChange}
                        />
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
                            placeholder="******"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <input
                            className="form-input my-3"
                            placeholder="******"
                            name="confirmPassword"
                            type="password"
                            value={formState.confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            className="btn btn-block btn-primary my-3"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                        >
                            Save
                        </button>
                    </form>
                    {error && (
                        <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>

    )
}

export default Profile;
