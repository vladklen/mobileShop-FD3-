import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setClientId, setClientName, setClientEmail, saveLocal } from '../redux/personSlice';
import { getCart } from '../redux/cartSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import { Button } from '@mui/material';
import { db } from '../firebase';
import './Login.css';

const Login = ({ active, setActive, regModal, setRegModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, loading, error] = useAuthState(auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            // loading
            return;
        }
        if (user) {
            const data = onSnapshot(collection(db, 'users'), (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid == user.uid) {
                        dispatch(setClientId(doc.data().uid));
                        dispatch(setClientName(doc.data().name));
                        dispatch(setClientEmail(doc.data().email));
                        dispatch(saveLocal());
                        dispatch(getCart(doc.data().cart));
                        setActive(false);
                    }
                });
            });
        }
    }, [user, loading, error]);

    const LoginPressed = async () => {
        await logInWithEmailAndPassword(email, password);
    };

    return (
        <div className={active ? 'login active' : 'login'} onClick={() => setActive(false)}>
            <div className="login__container" onClick={(e) => e.stopPropagation()}>
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Button variant="contained" onClick={LoginPressed}>
                    Login
                </Button>
                <div className="login__register" onClick={() => setActive(false)}>
                    Don't have an account? <Button onClick={() => setRegModal(true)}>Register</Button> now.
                </div>
            </div>
        </div>
    );
};

export default Login;
