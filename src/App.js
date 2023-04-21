import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import MainPage from "./page/MainPage";
import LoginPage from "./page/LoginPage"
import LoginPage2 from "./page/LoginPage2"
import Register from "./page/Register"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>

                <Route path="/account" element={<LoginPage/>}/>
                <Route path="/account/Login" element={<LoginPage2/>}/> /*관리자,사용자 로그인 */

                <Route path="/account/Register" element={<Register/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
