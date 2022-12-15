import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : {
          name: false,
          email: '',
          id: ''
      };

export const personSlice = createSlice({
    name: 'LoginedPersonInformation',
    initialState,
    reducers: {
        setClientName: (state, action) => {
            state.name = action.payload;
        },
        setClientId: (state, action) => {
            state.id = action.payload;
        },
        setClientEmail: (state, action) => {
            state.email = action.payload;
        },
        saveLocal: (state, action) => {
            localStorage.setItem('user', JSON.stringify(state));
        }
    }
});

export const { setClientName, setClientId, setClientEmail, saveLocal } = personSlice.actions;

export default personSlice.reducer;
// Redux Toolkit does some magic under hood wrapping the functions
// in the "reducers" list using Immer.js library
