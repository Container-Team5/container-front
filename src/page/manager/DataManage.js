import {Anchor, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {useEffect, useState} from "react";
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
const onSearch = (value) => {
    console.log(value)
};
const onClick = (value) => {
    console.log(value)
    window.open("/upload", "a", "width=700, height=500, left=100, top=50"); // 팝업 띄우기
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
    const onChange = (key) => {
        setCurrentTab(key)
        console.log(key);
    };
    const items = [
        {key: 'container', label: `컨테이너 관리`, children: <ContainerManage/>,},
        {key: 'pallete', label: `팔레트 관리`, children: <PalleteManage/>,}
    ];

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

const ContainerManage = (props) => {
    const [containers, setContainers] = useState([
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-03 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-03 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-05 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-05 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-05 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-28 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-28 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-28 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-28 11:00', },
        {id: '1', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 50000, deadline: '2023-05-28 11:00', },
    ]);

    useEffect(()=>{
        getContainerData()
    },[])

    const columns = [
        {title: '컨테이너ID', dataIndex: 'id', key: 'id',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'depth', key: 'depth',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
        {title: '무게제한(kg)', dataIndex: 'weightlimit', key: 'weightlimit',},
        {title: '출고마감시간', dataIndex: 'deadline', key: 'deadline',},
    ];


    const getContainerData = async ()=>{
        let result = (await axios.get("http://localhost:8080/api/container")).data
        setContainers(result)
    }

    return (
        <div>
            <Table dataSource={containers} columns={columns} pagination={false}/>
        </div>
    )
}

const PalleteManage = (props) => {

    const [pallete, setPallete] = useState([
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-03 11:00',},
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-03 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width:32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-03 15:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-05 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-28 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-28 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-28 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width:32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-28 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-28 11:00', },
        {id: '1', name:'삼성갤럭시Z플립4', count: '5', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, deadline: '2023-05-28 11:00', },
    ]);

    useEffect(()=>{
        getPalleteData()
    },[])

    const columns = [
        {title: '팔레트ID', dataIndex: 'id', key: 'id',},
        {title: '상품명', dataIndex: 'name', key: 'name',},
        {title: '수량(개)', dataIndex: 'count', key: 'count',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'depth', key: 'depth',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
        {title: '출고마감시간', dataIndex: 'deadline', key: 'deadline',},
    ];

    const getPalleteData = async ()=>{
        let result = (await axios.get("http://localhost:8080/api/palette")).data
        setPallete(result)
    }

    return (
        <div>
            <Table dataSource={pallete} columns={columns} pagination={false}/>
        </div>
    )
}

export default DataManage;