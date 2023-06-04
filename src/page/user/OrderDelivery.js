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
        {index: '1', name: '해태 에이스', count: 50, orderDate: '2023-05-30T14:20',
            dLine: '2023-05-30T14:20', firstDel: '부산항', finalDel: '부산광역시 서구 구덕로 120 서구청', delivery: '배송완료', },
        {index: '2', name: '크라운 새콤달콤', count: 100, orderDate: '2023-05-30T14:20',
            dLine: '2023-05-30T14:20', firstDel: '목포항', finalDel: '전라남도 목포시 하당로 215 하당동행정복지센터', delivery: '배송완료', },
        {index: '3', name: '축구공', count: 219, orderDate: '2023-05-30T14:20',
            dLine: '2023-05-30T14:20', firstDel: '인천항', finalDel: '인천 서구 서곶로 307 서구청', delivery: '배송완료', },
        {index: '4', name: '선풍기', count: 30, orderDate: '2023-05-30T14:20',
            dLine: '2023-05-30T14:20', firstDel: '부산항', finalDel: '부산광역시 동구 구청로 1 동구청', delivery: '배송완료', },
        {index: '5', name: '쿠첸 밥솥', count: 50, orderDate: '2023-05-30T14:20',
            dLine: '2023-05-30T14:20', firstDel: '목포항', finalDel: '전라남도 목포시 삼향천로 118 옥암동행정복지센터', delivery: '배송완료', },
        {index: '6', name: '아이시스 2L 6개 묶음', count: 20, orderDate: '2023-05-31T21:00',
            dLine: '2023-06-02T14:30', firstDel: '인천항', finalDel: '서울특별시 중구 세종대로 110 서울특별시청', delivery: '배송준비중', },
        {index: '7', name: '대림선 야채 김자반볶음 1+1 기획', count: 500, orderDate: '2023-05-31T21:00',
            dLine: '2023-06-03T15:30', firstDel: '인천항', finalDel: '경기도 수원시 영통구 도청로 30 경기도청', delivery: '배송준비중', },
        {index: '8', name: '삼성갤럭시Z플립3', count: 100, orderDate: '2023-05-31T21:00',
            dLine: '2023-06-03T16:40', firstDel: '부산항', finalDel: '부산광역시 해운대구 중동2로 해운대구청', delivery: '배송준비중', },

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

            <Content style={contentStyle}>
                <Table dataSource={orders} columns={columns} pagination={false}/>
            </Content>
        </Layout>
    )
})
export default OrderDelivery;