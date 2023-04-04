import {Anchor, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";

const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
};
const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#fff',
};

const MainPage = (props) => {
    return (
        <Layout>
            <Sider style={siderStyle}>Sider</Sider>
            <Content style={contentStyle}>
                <Anchor
                    direction="horizontal"
                    items={[
                        {
                            key: 'container',
                            href: '#container',
                            title: '컨테이너 관리',
                        },
                        {
                            key: 'pallete',
                            href: '#pallete',
                            title: '팔레트 관리',
                        },

                    ]}
                />
            </Content>
        </Layout>
    )
}
export default MainPage;