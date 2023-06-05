import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

import LoginPage from "./page/login/LoginPage"
import RegisterPage from "./page/login/Register";
import LoginPage2 from "./page/login/LoginPage2";
import FindAddress from "./page/login/FindAddress";

import DataManage from "./page/manager/DataManage";
import MainPageLayout from "./page/MainPageLayout";
import Upload from "./page/manager/Upload";
import LoadResultManage from "./page/manager/LoadResultManage";
import SetPallet from "./page/manager/SetPallet";
import MainPageLayoutForUser from "./page/MainPageLayoutForUser";
import GoodsRegister from "./page/user/GoodsRegister";
import OrderDelivery from "./page/user/OrderDelivery";
import Mapping from "./page/manager/Mapping";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/account" element={<LoginPage/>}/>
                <Route path="/account/Login" element={<LoginPage2/>}/>
                <Route path="/account/Register" element={<RegisterPage/>}/>

                <Route exact path="/" element={<MainPageLayout/>}>
                    <Route path="/data-manage" element={<DataManage/>}/>
                    <Route path="/load-result-manage" element={<LoadResultManage/>}/>
                </Route>
                <Route exact path="/user" element={<MainPageLayoutForUser/>}>
                    <Route path="/user/goods-register" element={<GoodsRegister/>}/>
                    <Route path="/user/order-delivery" element={<OrderDelivery/>}/>
                </Route>
                <Route path="/SetPallet" element={<SetPallet/>}/>
                <Route path="/upload" element={<Upload />}/>
                <Route path="/mapping" element={<Mapping />}/>
                <Route path="/account/Register/address" element={<FindAddress />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;