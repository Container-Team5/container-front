import {Anchor, Button, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
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

const OrderDelivery = forwardRef((props, ref) => {
    const [orders, setOrders] = useState([
        {index: '1', orderNum: 2023, name: '삼성갤럭시Z플립4', count: 5, orderDate: '2023-05-30T14:20:30',
            dLine: '2023-05-30T14:20:30', firstDel: '경기도 수원시', finalDel: '서울시 영등포구', delivery: '배송완료', },
        {index: '2', orderNum: 2022, name: '삼성태블릿PC S7', count: 6, orderDate: '2023-05-30T14:20:30',
            dLine: '2023-05-30T14:20:30', firstDel: '경기도 고양시', finalDel: '서울시 서초구', delivery: '배송중', },
        {index: '3', orderNum: 2021, name: '삼성갤럭시S21', count: 7, orderDate: '2023-05-30T14:20:30',
            dLine: '2023-05-30T14:20:30', firstDel: '경기도 성남시', finalDel: '서울시 강남구', delivery: '배송중', },

    ]);

    useEffect(()=>{
        getOrderData()
    },[])

    useImperativeHandle(ref, () => ({
        async search(searchParam){
            let result = (await axios.get(`http://localhost:8080/orderDelivery?name=${searchParam}`)).data
            setOrders(result)
        }
    }));

    const columns = [
        {title: '번호', dataIndex: 'index', key: 'index',},
        {title: '주문번호', dataIndex: 'orderNum', key: 'orderNum',},
        {title: '상품명', dataIndex: 'name', key: 'name',},
        {title: '주문개수', dataIndex: 'count', key: 'count',},
        {title: '주문일자', dataIndex: 'orderDate', key: 'orderDate',},
        {title: '출고마감시간', dataIndex: 'dLine', key: 'dLine',},
        {title: '1차 배송지', dataIndex: 'firstDel', key: 'firstDel',},
        {title: '최종 배송지', dataIndex: 'finalDel', key: 'finalDel',},
        {title: '배송현황', dataIndex: 'delivery', key: 'delivery',},
    ];


    const getOrderData = async ()=>{
        let result = (await axios.get("http://localhost:8080/orderDelivery")).data
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
})
export default OrderDelivery;