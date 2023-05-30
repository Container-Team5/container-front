import {Layout} from "antd";
import Navigation from "../component/Navigation";
import { Outlet } from "react-router";
import {useNavigate} from "react-router-dom";

const {Header} = Layout;

const headerStyle = {
    textAlign: 'left',
    color: '#fff',
    backgroundColor: '#abcdef',
};


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
        </Layout>
    )
}
export default MainPageLayout;