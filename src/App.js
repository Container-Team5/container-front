import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./page/LoginPage"
import './App.css';
import MainPage from "./page/MainPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
