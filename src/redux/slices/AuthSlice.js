import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    isAuthenticated: !!token,
    auth: {
        token : token || null, user: user || null
    }
}
const authSlice = createSlice({
    name: 'authenticated',
    initialState,
    reducers: {
        // Function to login
        login(state, action){
            const {token, user} = action.payload;

            localStorage.setItem('token',token);
            localStorage.setItem('user', JSON.stringify(user));

            state.isAuthenticated = true;
            state.auth = {token, user};
        },
        // Function to logout
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            state.isAuthenticated = false;
            state.auth = {
                token: null,
                user: null
            }
        }
    }

});

export const authActions = authSlice.actions;

export default authSlice.reducer