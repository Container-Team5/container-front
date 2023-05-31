import {Content} from "antd/es/layout/layout";
import styles from "../../component/LoginPage2.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {Form,Input,Checkbox,Button,Radio} from "antd";
import React, {useState} from 'react';
import LoginPageHeader from "../../component/LoginPageHeader";
import axios from 'axios';
import {useNavigate} from "react-router-dom";



const LoginPage2 = (props) => {
    const [userId,setUserId] = useState('');
    const [password,setPassword] = useState('');
    const [authority,setAuthority] = useState('0');
    const [msg,setMsg] = useState('');
    const navigate = useNavigate();
    const signInRequest = {
        "userId" : userId,
        "password" : password
    };



    const loginUser = async () => {
        if (authority == 0 && userId.length != 0 && password.length != 0) {
            setMsg('관리자 또는 사용자를 체크해주세요.');
        }
        else if (userId.length == 0 && password.length != 0) {
            setMsg('아이디는 필수 입력사항입니다.');
        }
        else if (userId.length != 0 && password.length == 0) {
            setMsg('비밀번호는 필수 입력사항입니다.');
        }
        else if (userId.length == 0 && password.length == 0) {
            setMsg('회원이 아니신 경우 회원가입을 눌러주세요.');
        }
        else {
            setMsg('');

            try {
                let result = (await axios.post("http://localhost:8080/account/signin",signInRequest));
                if(result.status == 200 && authority == '1') {
                    navigate('../../');
                }
                if(result.status == 200 && authority == '2') {
                    navigate('../../user');
                }
            } catch (e) {
               setMsg('정보를 올바르게 입력해주세요.');
            }
        };
    }

    return (
        <Content>
            <div className={styles.page_wrapper}>
                <LoginPageHeader/>

                <div className={styles.page_middle}>
                    <div className={styles.middle_login}>
                        <Form className={styles.login_form} initialValues={{Remember:true}}>
                            <Form.Item>
                                <Radio.Group >
                                    <Radio.Button value={"Administrator"} onClick={(e) => { setAuthority('1')}}>관리자</Radio.Button>
                                    <Radio.Button value={"User"} onClick={(e) => { setAuthority('2') }}>사용자</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name={"Username"}>
                                <Input className={styles.login_form_input} prefix={<UserOutlined/>} onChange={(e) => { setUserId(e.target.value); }} value={userId} placeholder={"아이디를 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"Password"}>
                                <Input.Password className={styles.login_form_input} prefix={<LockOutlined/>} onChange={(e) => { setPassword(e.target.value); }} value={password} placeholder={"비밀번호를 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"Remember"} valuePropName={"checked"} noStyle>
                                <Checkbox>아이디 자동저장</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" className={styles.login_form_button} onClick={loginUser}>로그인</Button>
                                <a href={"http://localhost:3000/account/Register"} className={styles.login_form_register}>회원가입</a>
                            </Form.Item>
                            <Form.Item>
                                <text className={styles.login_error}>{msg}</text>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <footer className={styles.page_footer}>
                    <h1>컨테이너의 모든 것</h1>
                </footer>
            </div>
        </Content>
    )
}
export default LoginPage2;