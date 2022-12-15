import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../redux/cartSlice';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Button } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Cart.css';
import { db } from '../firebase';
import CompletePerchase from './CompletePerchase';

import { Link } from 'react-router-dom';

const Cart = () => {
    const clientCart = useSelector((state) => state.cart);
    const client = useSelector((state) => state.person.id);
    const dispatch = useDispatch();

    const cartChange = async () => {
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
    };

    useEffect(() => {
        dispatch(getTotals());
        cartChange();
    }, [clientCart, dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };
    const handleDecreaseCart = (product) => {
        dispatch(decreaseCart(product));
    };
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };
    const handleClearCart = () => {
        dispatch(clearCart());
    };
    return (
        <div className="Cart">
            <h2>Shopping Cart</h2>
            {clientCart.cartItems.length == 0 ? (
                <div className="cart__empty">
                    <p>Your cart is currently empty</p>
                    <div className="start__shopping">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#1976d2',
                                color: 'white'
                            }}
                        >
                            <Link to="/products">
                                <ArrowBackIcon />
                                <span>Start Shopping</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="cart__content">
                    <div className="cart__titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <TransitionGroup className="cart__items">
                        {clientCart.cartItems != 0 &&
                            clientCart.cartItems.map((cartItem) => (
                                <CSSTransition key={cartItem.id} timeout={500} classNames="cart__item">
                                    <div className="cart__item" key={cartItem.id}>
                                        <div className="item__product">
                                            <img src={cartItem.img} alt={cartItem.name} />
                                            <div className="product__description">
                                                <h3>{cartItem.description}</h3>
                                                <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                                            </div>
                                        </div>
                                        <div className="item__price">{cartItem.price} BYN</div>
                                        <div className="item__quantity">
                                            <button onClick={() => handleDecreaseCart(cartItem)}>
                                                <svg viewBox="0 0 409.6 409.6">
                                                    <g>
                                                        <g>
                                                            <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </button>
                                            <div className="count">{cartItem.cartQuantity}</div>
                                            <button onClick={() => handleAddToCart(cartItem)}>
                                                <svg viewBox="0 0 426.66667 426.66667">
                                                    <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="item_total-price">
                                            {cartItem.price * cartItem.cartQuantity} BYN
                                        </div>
                                    </div>
                                </CSSTransition>
                            ))}
                    </TransitionGroup>

                    <div className="cart__summary">
                        <div className="summary__price">
                            <span>Total Price:</span>
                            <span className="amount"> {clientCart.cartTotalAmount} BYN</span>
                        </div>
                        <div className="summary__buttons">
                            <Button variant="outlined" onClick={() => handleClearCart()}>
                                Clear Cart
                            </Button>
                            <CompletePerchase text="BUY it NOW"></CompletePerchase>
                        </div>
                        <div className="continue__shopping">
                            <Button
                                variant="text"
                                style={{
                                    color: '#1976d2'
                                }}
                            >
                                <Link to="/products">
                                    <ArrowBackIcon />
                                    <span>Continue Shopping</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
