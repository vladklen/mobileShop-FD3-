import React from 'react';
import { logout } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setClientId, setClientName, setClientEmail } from '../redux/personSlice';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const LogOut = () => {
    const client = useSelector((state) => state.person.id);
    const clientCart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clientLogout = async () => {
        const q = query(collection(db, 'users'), where('uid', '==', client));

        const querySnapshot = await getDocs(q);
        let docID = '';
        querySnapshot.forEach((doc) => {
            docID = doc.id;
        });
        const user = doc(db, 'users', docID);
        await updateDoc(user, {
            cart: clientCart
        });
        logout();
        dispatch(setClientId(null));
        dispatch(setClientName(false));
        dispatch(setClientEmail(null));
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate('/');
    };

    return (
        <div>
            <Button
                variant="outlined"
                sx={{ color: '#a6a5a5', backgroundColor: 'none', borderColor: '#a6a5a5' }}
                className="nav__btn"
                onClick={clientLogout}
            >
                Logout
            </Button>
        </div>
    );
};

export default LogOut;
