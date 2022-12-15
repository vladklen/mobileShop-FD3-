import { configureStore } from '@reduxjs/toolkit';

import personReducer from './personSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
    reducer: {
        person: personReducer,
        cart: cartReducer
    }
});
