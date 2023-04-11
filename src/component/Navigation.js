import {Menu} from "antd";
import {useState} from "react";

const Navigation = (props) => {
    const items = [
        {key: 'part-1', label: '적재데이터관리'},
        {key: 'part-2', label: '상품주문관리'},
        {key: 'part-3', label: '적재결과관리'},
        {key: 'part-4', label: '적재결과 REPORT'}
    ]
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <div>

            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </div>
    )
}

export default Navigation