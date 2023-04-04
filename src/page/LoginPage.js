import {Content} from "antd/es/layout/layout";
import styles from "../component/LoginPage.module.css";

const LoginPage = (props) => {
    return (
        <Content>
            <div className={styles.login}>
                <b>컨테이너의 모든 것</b>
                <h1>Everything of Container</h1>
                <br/>
                <button className={styles.btn1}>관리자 LOGIN</button>
                <br/><br/>
                <button className={styles.btn1}> 사용자 LOGIN</button>
                <br/><br/>
                <button className={styles.btn1}>SIGN UP</button>
            </div>
        </Content>
    )
}
export default LoginPage;