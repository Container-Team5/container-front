import {Layout} from "antd";
import Navigation from "../component/Navigation";
import Message from "../component/Message";
import { Outlet } from "react-router"
import { Routes, Route} from "react-router-dom";
import DataManage from "./manager/DataManage";

const {Header, Footer} = Layout;

const headerStyle = {
    textAlign: 'right',
    color: '#000',
    paddingInline: 50,
    backgroundColor: '#fff',
};

const footerStyle = {
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
};

const MainPageLayout = (props) => {
    return (
        <Layout style={{height: '100vh'}}>
            <Header style={headerStyle}>
                <Navigation/>
            </Header>

            <Layout>
                <Outlet />
            </Layout>

            <Footer style={footerStyle}>
                <Message/>
            </Footer>
        </Layout>
    )
}
export default MainPageLayout;