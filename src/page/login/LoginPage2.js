import {Content} from "antd/es/layout/layout";
import styles from "../../component/LoginPage2.module.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {Form,Input,Checkbox,Button,Radio} from "antd";
import React, {useState} from 'react';
import LoginPageHeader from "../../component/LoginPageHeader";



const LoginPage2 = (props) => {
    const navigate = useNavigate();

    const goRegisterPage = () => {
        navigate('../account/Register');
    }
    const goLoginPage = () => {
        navigate('../account/Login');
    }
    const goAccountPage = () => {
        navigate('../account');
    }

    const goMainPage = () => {
        navigate('../');
    }

    return (
        <Content>
            <div className={styles.page_wrapper}>
                <LoginPageHeader/>

                <div className={styles.page_middle}>
                    <div className={styles.middle_login}>
                        <Form className={styles.login_form}>
                            <Form.Item>
                                <Radio.Group >
                                    <Radio.Button value={"Administrator"}>관리자</Radio.Button>
                                    <Radio.Button value={"User"}>사용자</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name={"Username"} rules={[{required: true, message: 'Please input your Username!'}]}>
                                <Input className={styles.login_form_input} prefix={<UserOutlined/>} placeholder={"아이디를 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"Password"} rules={[{required: true, message: 'Please input your Password!'}]}>
                                <Input.Password className={styles.login_form_input} prefix={<LockOutlined/>}placeholder={"비밀번호를 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"Remember"} valuePropName={"checked"} noStyle>
                                <Checkbox>아이디 자동저장</Checkbox>
                            </Form.Item>
                            <Form.Item>
                                <Button type={"primary"} htmlType={"submit"} className={styles.login_form_button}>로그인</Button>
                                Or <a href={"http://localhost:3000/account/Register"} className={styles.login_form_register}>회원가입</a>
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