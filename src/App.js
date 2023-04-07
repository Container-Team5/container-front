import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./page/LoginPage"
import './App.css';
import MainPage from "./page/MainPage";
import RegisterPage from "./page/RegisterPage";
import LoginPage2 from "./page/LoginPage2"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login2" element={<LoginPage2/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
