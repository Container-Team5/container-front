import {Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {createRef, useState} from "react";
import './DataManage.css';
import DataManageTabControl from "./DataManageTabControl";
import ContainerTab from "./container/ContainerTab";
import PaletteTab from "./palette/PaletteTab";

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
    const [currentTab, setCurrentTab] = useState('container')
    const containerRef = createRef();
    const paletteRef = createRef();

    const items = [
        {key: 'container', label: `컨테이너 관리`, children: <ContainerTab ref={containerRef}/>,},
        {key: 'palette', label: `팔레트 관리`, children: <PaletteTab ref={paletteRef}/>,}
    ];

    return (
        <Layout>
            <Sider style={siderStyle}>
                <DataManageTabControl tab={currentTab} containerRef={containerRef} paletteRef={paletteRef}/>
            </Sider>
            <Content style={contentStyle}>
                <Tabs defaultActiveKey="container" items={items} onChange={setCurrentTab}/>
            </Content>
        </Layout>
    )
}

export default DataManage;