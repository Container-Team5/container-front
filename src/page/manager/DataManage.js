import {Anchor, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";

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
    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {key: 'container', label: `컨테이너 관리`, children: <ContainerManage/>,},
        {key: 'pallete', label: `팔레트 관리`, children: <PalleteManage/>,}
    ];
    return (
        <Layout>
            <Sider style={siderStyle}>Sider</Sider>
            <Content style={contentStyle}>
                <Tabs defaultActiveKey="container" items={items} onChange={onChange}/>
            </Content>
        </Layout>
    )
}

const ContainerManage = (props) => {
    const dataSource = [
        {id: 'Mike', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 40000, deadline: '2023-04-28 17:22:21', },
        {id: 'Mike', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 40000, deadline: '2023-04-28 17:22:21',},
        {id: 'Mike', width: 32, depth: 10, height: 100, volume:1000, weight: 32000, weightlimit: 40000, deadline: '2023-04-28 17:22:21',},
    ];

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
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
        </div>
    )
}

const PalleteManage = (props) => {
    const dataSource = [
        {id: 'Mike', name:'맥북프로', count: 100,width: 32, depth: 10, height: 100, volume: 32000, weight: 2000,},
        {id: 'Mike', name:'맥북프로', count: 100,width: 32, depth: 10, height: 100, volume: 32000, weight: 2000,},
        {id: 'Mike', name:'맥북프로', count: 100,width: 32, depth: 10, height: 100, volume: 32000, weight: 2000,},
    ];

    const columns = [
        {title: '팔레트ID', dataIndex: 'id', key: 'id',},
        {title: '상품명', dataIndex: 'name', key: 'name',},
        {title: '수량(개)', dataIndex: 'count', key: 'count',},
        {title: '가로(m)', dataIndex: 'width', key: 'width',},
        {title: '세로(m)', dataIndex: 'depth', key: 'depth',},
        {title: '높이(m)', dataIndex: 'height', key: 'height',},
        {title: '부피(m^3)', dataIndex: 'volume', key: 'volume',},
        {title: '무게(kg)', dataIndex: 'weight', key: 'weight',},
    ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
        </div>
    )
}

export default DataManage;