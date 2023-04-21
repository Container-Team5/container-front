import {Menu} from "antd";
import {useState} from "react";
import "./Navigation.css"
import {useNavigate} from "react-router-dom";

const Navigation = (props) => {
    const navigate = useNavigate();
    const items = [
        {key: 'data-manage', label: '적재데이터관리'},
        {key: 'order-manage', label: '상품주문관리'},
        {key: 'part-3', label: '적재결과관리'},
    ]
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        navigate(`${e.key}`);
        setCurrent(e.key);
    };

    return (
        <div>
            <div className="logo">컨테이너의 모든것</div>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </div>
    )
}

export default Navigation