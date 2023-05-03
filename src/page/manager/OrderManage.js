import {Anchor, Button, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    backgroundColor: '#fff',
};
const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
};

const onSearch = (value) => {
    console.log(value)
};


const OrderManage = (props) => {
    const [orders, setOrders] = useState([
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, width: 32, depth: 10, height: 100, volume:1000, weight: 32000, },
    ]);


    useEffect(()=>{
        getOrderData()
    },[])

    const columns = [
        {title: '번호', dataIndex: 'index', key: 'index',},
        {title: '주문번호', dataIndex: 'orderNum', key: 'orderNum',},
        {title: '상품명', dataIndex: 'name', key: 'name',},
        {title: '수량(개)', dataIndex: 'count', key: 'count',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'depth', key: 'depth',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
    ];


    const getOrderData = async ()=>{
        let result = (await axios.get("http://localhost:8080/api/memo/{id}")).data
        setOrders(result)
    }

    return (
        <Layout>
            <Sider style={siderStyle}>
                <Search className="search" placeholder="input search text" onSearch={onSearch} enterButton />
            </Sider>
            <Content style={contentStyle}>
                <Table dataSource={orders} columns={columns} pagination={false}/>
            </Content>
        </Layout>
    )
}
export default OrderManage;