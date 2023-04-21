import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./page/login/LoginPage"
import './App.css';
import MainPageLayout from "./page/MainPageLayout";
import RegisterPage from "./page/login/RegisterPage";
import LoginPage2 from "./page/login/LoginPage2"
import DataManage from "./page/manager/DataManage";
import OrderManage from "./page/manager/OrderManage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<MainPageLayout/>}>
                    <Route path="/data-manage" element={<DataManage/>}/>
                    <Route path="/order-manage" element={<OrderManage/>}/>
                </Route>
                // upload 팝업 path 지정해서 window.open 코드에 적기
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
