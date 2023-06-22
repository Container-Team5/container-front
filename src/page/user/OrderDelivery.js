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

const OrderDelivery = forwardRef((props, ref) => {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        getOrderData()
    },[])


    const columns = [
        {title: '번호', dataIndex: 'paletteId', key: 'paletteId',},
        {title: '상품명', dataIndex: 'paletteName', key: 'paletteName',},
        {title: '주문개수', dataIndex: 'quantity', key: 'quantity',},
        {title: '출고마감시간', dataIndex: 'deadLine', key: 'deadLine',},
        {title: '1차 배송지', dataIndex: 'firstDel', key: 'firstDel',},
        {title: '최종 배송지', dataIndex: 'finalDel', key: 'finalDel',},
        {title: '배송현황', dataIndex: 'delivery', key: 'delivery',},
    ];


    const getOrderData = async ()=>{
        let result = (await axios.get("http://localhost:8080/palette",
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},}
        )).data
        setOrders(result.map(value => ({...value, delivery:"배송중"})))
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