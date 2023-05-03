import {Anchor, Layout, Table, Tabs} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import axios from "axios";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import './DataManage.css';


const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    backgroundColor: '#fff',
};
const siderStyle = {
    textAlign: 'right',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
};

const onSearch = (value) => {
    console.log(value)
};

const LoadResultManage = (props) => {
    return (
        <Layout>
            <Sider style={siderStyle}>
            <Search className="search" placeholder="input search text" onSearch={onSearch} enterButton />
            </Sider>
            <Content style={contentStyle}>
                <p> 3D 부분입니다 </p>
            </Content>
        </Layout>
    )
}

export default LoadResultManage;