import User from "../Models/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import user from "../Models/User";

export interface AuthState{
    user:User;
    token:string;
}

const initState:AuthState ={
    user: sessionStorage.getItem("token") ? jwtDecode(sessionStorage.getItem("token")) : null,
    token: sessionStorage.getItem("token") ? sessionStorage.getItem("token") : ""
}


export const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            sessionStorage.setItem('token', state.token);
            state.user = jwtDecode(action.payload);

        },
        logout:(state) => {
            state.token = "";
            state.user = null;
            sessionStorage.removeItem('token');

        }
    }
});
export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
