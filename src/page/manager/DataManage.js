import {Anchor, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import './DataManage.css';


const { Search } = Input;
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onClick = (value) => {
    console.log(value)
    window.open("/upload", "a", "width=500, height=500, left=100, top=50"); // 팝업 띄우기
};
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

const DataManage = (props) => {
    const [currentTab, setCurrentTab] = useState('container') // state 만들어서 컨테이너에만 update 기능 활성화
    const containerRef = createRef();
    const paletteRef = createRef();

    const onChange = (key) => {
        setCurrentTab(key)
        console.log(key);
    };
    const items = [
        {key: 'container', label: `컨테이너 관리`, children: <ContainerManage ref={containerRef}/>,},
        {key: 'pallete', label: `팔레트 관리`, children: <PalleteManage ref={paletteRef}/>,}
    ];

    const onSearch = (value) => {
        if(currentTab === 'container')
            containerRef.current.search(value)
        else if(currentTab === 'pallete')
             paletteRef.current.search(value)
    };

    return (
        <Layout>
            <Sider style={siderStyle}>
                <Search className="search" placeholder="input search text" onSearch={onSearch} enterButton />
                {
                    currentTab === 'container'
                        ? <Button className="button" type="primary" onClick={onClick}>UPLOAD</Button>
                        : null
                }
            </Sider>
            <Content style={contentStyle}>
                <Tabs defaultActiveKey="container" items={items} onChange={onChange}/>
            </Content>
        </Layout>
    )
}

const ContainerManage = forwardRef((props, ref) => {
    const [containers, setContainers] = useState([]);

    useEffect(()=>{
        getContainerData()
    },[])


    useImperativeHandle(ref, () => ({
        async search(searchParam){
            let result = (await axios.get(`http://localhost:8080/container?containerId=${searchParam}`)).data
            setContainers(result)
        }
    }));



    const columns = [
        {title: '컨테이너ID', dataIndex: 'containerId', key: 'containerId',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'length', key: 'length',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
        {title: '무게제한(kg)', dataIndex: 'weightLimit', key: 'weightLimit',},
        {title: '출고마감시간', dataIndex: 'releaseDate', key: 'releaseDate',},
    ];


    const getContainerData = async ()=>{
        let result = (await axios.get("http://localhost:8080/container")).data
        setContainers(result)
    }

    return (
        <div>
            <Table dataSource={containers} columns={columns} pagination={false}/>
        </div>
    )
})

const PalleteManage = forwardRef((props, ref) => {

    const [pallete, setPallete] = useState([]);

    useEffect(()=>{
        getPalleteData()
    },[])

    useImperativeHandle(ref, () => ({

        async search(searchParam){
            let result = (await axios.get(`http://localhost:8080/palette?pName=${searchParam}`)).data
            setPallete(result)
        }

    }));
    const columns = [
        {title: '팔레트ID', dataIndex: 'pid', key: 'pid',},
        {title: '상품명', dataIndex: 'paletteName', key: 'paletteName',},
        {title: '수량(개)', dataIndex: 'quantity', key: 'quantity',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'length', key: 'length',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
        {title: '출고마감시간', dataIndex: 'deadLine', key: 'deadLine',},
    ];

    const getPalleteData = async ()=>{
        let result = (await axios.get("http://localhost:8080/palette")).data
        setPallete(result)
    }

    return (
        <div>
            <Table dataSource={pallete} columns={columns} pagination={false}/>
        </div>
    )
})

export default DataManage;