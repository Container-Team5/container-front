import {Layout} from "antd";
import Navigation from "../component/Navigation";
import Message from "../component/Message";
import { Outlet } from "react-router";
import {useNavigate} from "react-router-dom";

import { Routes, Route} from "react-router-dom";
import DataManage from "./manager/DataManage";

const {Header} = Layout;

const headerStyle = {
    textAlign: 'left',
    color: '#fff',
    backgroundColor: '#abcdef',
};


// const footerStyle = {
//     textAlign: 'center',
//     color: '#000',
//     backgroundColor: '#bbbbbb',
// };


const MainPageLayout = (props) => {
    const navigate = useNavigate();
    const goMainPage = () => {
        navigate('./');
    }


    return (
        <Layout style={{height: '100vh'}}>
            <Header style={headerStyle}>
                <h1 onClick={goMainPage} style={{cursor:'pointer'}}>Everything of Container</h1>
            </Header>
            <Navigation/>
            <Layout>
                <Outlet />
            </Layout>
            {/*<Footer style={footerStyle}>*/}
            {/*    <Message/>*/}
            {/*</Footer>*/}
        </Layout>
    )
}
export default MainPageLayout;