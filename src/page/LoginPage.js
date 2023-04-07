import {Content} from "antd/es/layout/layout";
import styles from "../component/LoginPage.module.css";
import {useNavigate} from "react-router-dom";

const LoginPage = (props) => {
    const navigate = useNavigate();


    const goRegisterPage = () => {
        navigate('../RegisterPage');
    }
    const goLoginPage = () => {
        navigate('../LoginPage2');
    }

    return (
        <Content>
            <div className={styles.login}>
                <b>컨테이너의 모든 것</b>
                <h1>Everything of Container</h1>
                <br/>
                <button className={styles.btn1} onClick={goLoginPage}>관리자 LOGIN</button>
                <br/><br/>
                <button className={styles.btn1} onClick={goLoginPage}> 사용자 LOGIN</button>
                <br/><br/>
                <button className={styles.btn1} onClick={goRegisterPage}>SIGN UP</button>
            </div>
        </Content>
    )
}
export default LoginPage;