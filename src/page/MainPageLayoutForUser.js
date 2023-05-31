import {Menu} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import  '../component/Navigation.css';

const Navigation = (props) => {
    const navigate = useNavigate();
    const items = [
        {key: 'goods-register', label: '상품등록'},
        {key: 'order-delivery', label: '주문/배송'},
    ]
    const [click, setClick] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        navigate(`${e.key}`);
        setClick(e.key);
    };

    const goRegisterPage = () => {
        navigate('../account/Register');
    }
    const goLoginPage = () => {
        navigate('../account/Login');
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
            <Menu onClick={onClick} selectedKeys={[click]} mode="horizontal" items={items}/>
        </div>
    )
}

export default Navigation