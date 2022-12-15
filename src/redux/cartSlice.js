import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
    ? JSON.parse(window.localStorage.getItem('cart'))
    : {
          cartItems: [],
          cartQuantity: 0,
          cartPrice: 0
      };

export const cartSlice = createSlice({
    name: 'PersonCart',
    initialState,
    reducers: {
        getCart: (state, action) => {
            state = action.payload;
        },
        addToCart(state, action) {
            state.cartQuantity += 1;
            const existingIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (existingIndex >= 0) {
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + 1
                };
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        decreaseCart(state, action) {
            state.cartQuantity -= 1;
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
                state.cartItems = nextCartItems;
            }
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const amount = cartItem.cartQuantity;
                    const nextCartItems = state.cartItems.filter((item) => item.id !== cartItem.id);
                    state.cartItems = nextCartItems;
                    state.cartQuantity -= amount;
                    localStorage.setItem('cart', JSON.stringify(state));
                }
                return state;
            });
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotal = price * cartQuantity;

                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart(state, action) {
            state.cartItems = [];
            state.cartQuantity = 0;
            localStorage.removeItem('cart');
        }
    }
});

export const { getCart, addToCart, decreaseCart, removeFromCart, getTotals, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
// Redux Toolkit does some magic under hood wrapping the functions
// in the "reducers" list using Immer.js library
