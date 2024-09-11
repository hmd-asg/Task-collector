import { useQuery, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { QUERY_ME } from '../utils/queries.js';
import { UPDATE_USER } from '../utils/mutations.js';
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import './Profile.css'; // Import the CSS file for styling

function Profile() {
    const navigate = useNavigate();
    const { loading, data } = useQuery(QUERY_ME);
    const [errorMessage, setErrorMessage] = useState(false);
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
            } else {
                await updateUser({ variables: { username, email, password } });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main>
            <div className="profile-form">
                <h4>Update Your Profile</h4>
                <form onSubmit={handleFormSubmit}>
                    <input
                        className="form-input"
                        placeholder="Your username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        placeholder="******"
                        name="confirmPassword"
                        type="password"
                        value={formState.confirmPassword}
                        onChange={handleChange}
                    />
                    <button className="btn-primary" type="submit">Save</button>
                    {errorMessage && <div className="error-message">Passwords do not match.</div>}
                    {error && <div className="error-message">{error.message}</div>}
                </form>
            </div>
        </main>
    );
}

export default Profile;
