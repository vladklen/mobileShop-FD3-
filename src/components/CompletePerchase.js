import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@material-ui/core';

const CompletePerchase = (props) => {
    const client = useSelector((state) => state.person.id);
    const clientCart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const clientBuy = async () => {
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
        dispatch(clearCart());
    };

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#1976d2',
                    color: 'white'
                }}
                onClick={clientBuy}
            >
                {props.text}
            </Button>
        </div>
    );
};

export default CompletePerchase;
