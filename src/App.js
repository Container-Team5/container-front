import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import LoginPage from "./page/login/LoginPage"
import RegisterPage from "./page/login/Register";
import LoginPage2 from "./page/login/LoginPage2";
import FindAddress from "./page/login/FindAddress";
import CheckDupId from "./page/login/CheckDupId";

import DataManage from "./page/manager/DataManage";
import OrderManage from "./page/manager/OrderManage";
import MainPageLayout from "./page/MainPageLayout";
import Upload from "./page/manager/Upload";
import LoadResultManage from "./page/manager/LoadResultManage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/account" element={<LoginPage/>}/>
                <Route path="/account/Login" element={<LoginPage2/>}/>
                <Route path="/account/Register" element={<RegisterPage/>}/>

                <Route exact path="/" element={<MainPageLayout/>}>
                    <Route path="/data-manage" element={<DataManage/>}/>
                    <Route path="/order-manage" element={<OrderManage/>}/>
                    <Route path="/load-result-manage" element={<LoadResultManage/>}/>
                </Route>
                <Route path="/upload" element={<Upload />}/>
                <Route path="/account/Register/address" element={<FindAddress />}/>
                <Route path="/account/Register/checkDup" element={<CheckDupId />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;