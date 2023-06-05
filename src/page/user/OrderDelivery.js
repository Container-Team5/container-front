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

    ]);

    useEffect(()=>{
        getOrderData()
    },[])

    useImperativeHandle(ref, () => ({
        async search(searchParam){
            let result = (await axios.get(`http://localhost:8080/orderDelivery?name=${searchParam}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,}}
            )).data
            setOrders(result)
        }
    }));

    const columns = [
        {title: '번호', dataIndex: 'index', key: 'index',},
        {title: '상품명', dataIndex: 'name', key: 'name',},
        {title: '주문개수', dataIndex: 'count', key: 'count',},
        {title: '출고마감시간', dataIndex: 'dLine', key: 'dLine',},
        {title: '1차 배송지', dataIndex: 'firstDel', key: 'firstDel',},
        {title: '최종 배송지', dataIndex: 'finalDel', key: 'finalDel',},
        {title: '배송현황', dataIndex: 'delivery', key: 'delivery',},
    ];


    const getOrderData = async ()=>{
        // let result = (await axios.get(`http://localhost:8080/admin/${IndexAdId}/palette/${paletteId}`,
        //     {
        //         headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},}
        // )).data
        // setOrders(result)
    }

    return (
        <Layout>

            <Content style={contentStyle}>
                <Table dataSource={orders} columns={columns} pagination={false}/>
            </Content>
        </Layout>
    )
})
export default OrderDelivery;