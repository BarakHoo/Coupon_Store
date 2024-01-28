import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Routing from "./Components/Routing/Routing";
import { createTheme } from '@mui/material/styles';
import {ToastContainer} from "react-toastify";
import axios from "axios";
import {authStore} from "./Redux/AuthStore";
import { ThemeProvider } from '@emotion/react';
import Footer from "./Components/Footer/Footer";
function interceptors() {
    axios.interceptors.request.use(request => {
        if(authStore.getState().token.length>0){
            request.headers["Authorization"] = authStore.getState().token;
        }
        return request;
        })

}
interceptors();


const theme = createTheme({
    palette: {
        primary: {
            main: '#87CEEB', // lightskyblue
        },
        secondary: {
            main: '#0000CD', // mediumblue
        },
        text: {
            primary: '#FFFFFF', // white
        },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(

<BrowserRouter>
    <ThemeProvider theme={theme}>
    <Layout/>
    <ToastContainer/>
    <Routing/>
    </ThemeProvider>
    <Footer/>
</BrowserRouter>


);


reportWebVitals();
