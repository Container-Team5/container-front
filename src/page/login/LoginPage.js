import {Content} from "antd/es/layout/layout";
import styles from "../../component/LoginPage.module.css";
import {useNavigate} from "react-router-dom";
import user_login from "../../user-login.png";
import user_register from "../../user-register.png";


const LoginPage = (props) => {
    const navigate = useNavigate();

    const goRegisterPage = () => {
        navigate('./Register');
    }
    const goLoginPage = () => {
        navigate('./Login');
    }
    const goAccountPage = () => {
        navigate('../account');
    }

    return (
        <Content>
            <div className={styles.page_wrapper}>
                <header className={styles.page_header}>
                    <h1 onClick={goAccountPage}>Everything Of Container</h1>
                    <nav>
                        <span onClick={goLoginPage}>로그인</span>
                        <span> | </span>
                        <span onClick={goRegisterPage}>회원가입</span>
                    </nav>
                </header>

                <div className={styles.page_middle}>
                    <div className={styles.middle_login}>
                        <img src={user_login}/>
                        <h2>관리자/사용자 로그인</h2>
                        <button className={styles.middle_button} onClick={goLoginPage}>로그인</button>
                    </div>
                    <div className={styles.middle_register}>
                        <img src={user_register}/>
                        <h2>관리자/사용자 회원가입</h2>
                        <button className={styles.middle_button} onClick={goRegisterPage}>회원가입</button>
                    </div>
                </div>
                <footer className={styles.page_footer}>
                    <h3>컨테이너의 모든 것</h3>
                </footer>
            </div>
        </Content>
    )
}
export default LoginPage;