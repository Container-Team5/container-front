import {Layout, Menu} from "antd";
import { Outlet } from "react-router";
import {useNavigate} from "react-router-dom";
import NavigationForUser from "../component/NavigationForUser";

const {Header} = Layout;

const headerStyle = {
    textAlign: 'left',
    color: '#fff',
    backgroundColor: '#abcdef',
};

const MainPageLayoutForUser = (props) => {
    const navigate = useNavigate();
    const goMainPageForUser = () => {
        navigate('./user');
    }

    return (
        <Layout style={{height: '100vh'}}>
            <Header style={headerStyle}>
                <h1 onClick={goMainPageForUser}>Everything of Container</h1>
            </Header>
            <NavigationForUser/>
            <Layout style={{height: '100%', overflow: 'auto'}}>
                <Outlet />
            </Layout>
        </Layout>
    )
}
export default MainPageLayoutForUser;