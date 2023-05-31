import styles from "./LoginPageHeader.module.css";
import {useNavigate} from "react-router-dom";


const LoginPageHeader = (props) => {
    const navigate = useNavigate();

    const goRegisterPage = () => {
        navigate('/account/Register');
    }
    const goLoginPage = () => {
        navigate('/account/Login');
    }
    const goAccountPage = () => {
        navigate('/account');
    }
    return(
        <header className={styles.page_header}>
            <h1 onClick={goAccountPage}>Everything Of Container</h1>
            <nav className={styles.login_navigation}>
                <span className={styles.login_menu} onClick={goLoginPage}>로그인</span>
                <span className={styles.login_menu_tab}> | </span>
                <span className={styles.login_menu} onClick={goRegisterPage}>회원가입</span>
            </nav>
        </header>

    )
}

export default LoginPageHeader;
