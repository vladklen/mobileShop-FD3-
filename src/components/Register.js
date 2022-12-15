import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../firebase';
import { useDispatch } from 'react-redux';
import { setClientId, setClientName, setClientEmail } from '../redux/personSlice';
import { getCart } from '../redux/cartSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../firebase';

import './Register.css';
function Register({ active, setActive, setLogModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const register = () => {
        if (!name) alert('Please enter name');
        registerWithEmailAndPassword(name, email, password);
    };
    useEffect(() => {
        if (loading) return;
        if (user) {
            const data = onSnapshot(collection(db, 'users'), (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid == user.uid) {
                        dispatch(setClientId(doc.data().uid));
                        dispatch(setClientName(doc.data().name));
                        dispatch(setClientEmail(email));
                        dispatch(getCart(doc.data().cart));
                        setActive(false);
                    }
                });
            });
        }
    }, [user, loading]);

    return (
        <div className={active ? 'register active' : 'register'} onClick={() => setActive(false)}>
            <div className="register__container" onClick={(e) => e.stopPropagation()}>
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                />
                <input
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: '#1976d2',
                        color: 'white'
                    }}
                    onClick={() => {
                        register();
                    }}
                >
                    Register
                </Button>
                <div className="register__register">
                    Already have an account?
                    <Button
                        variant="text"
                        onClick={() => {
                            setLogModal(true);
                            setActive(false);
                        }}
                    >
                        Login
                    </Button>{' '}
                    now.
                </div>
            </div>
        </div>
    );
}
export default Register;
