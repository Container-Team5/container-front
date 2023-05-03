import {Menu} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import  './Navigation.css';

const Navigation = (props) => {
    const navigate = useNavigate();
    const items = [
        {key: 'data-manage', label: '적재데이터관리'},
        {key: 'order-manage', label: '상품주문관리'},
        {key: 'load-result-manage', label: '적재결과관리'},
    ]
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        navigate(`${e.key}`);
        setCurrent(e.key);
    };

    const goRegisterPage = () => {
        navigate('./account/Register');
    }
    const goLoginPage = () => {
        navigate('./account/Login');
    }

    const navStyle = {
        textAlign : 'right',
        backgroundColor: '#abcdef',
        color : 'white',
        textStyle: 'bold',
    }

    return (
        <div>
            <nav style={navStyle}>
                <span className="login_menu" onClick={goLoginPage}> 로그인</span>
                <span className="login_menu_tab"> | </span>
                <span className="signup_menu" onClick={goRegisterPage}> 회원가입 </span>
            </nav>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </div>
    )
}

export default Navigation