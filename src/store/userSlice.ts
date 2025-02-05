// src/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    practice: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPractice(state, action) {
            state.practice = action.payload;
        },
    },
});

// Export actions to be dispatched
export const { setPractice } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
