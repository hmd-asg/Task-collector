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
        <main>
            <div>Update your profile</div>
            <div>
                <h4>Update</h4>
                <form onSubmit={handleFormSubmit}>
                    <input
                        placeholder="Your username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Your email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="******"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="******"
                        name="confirmPassword"
                        type="password"
                        value={formState.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit">Save</button>
                </form>

                {error && <div>{error.message}</div>}

            </div>
        </main>
    )
}

export default Profile;
