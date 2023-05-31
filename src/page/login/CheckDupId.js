import React, { useState,useEffect } from 'react';
import styles from "../../component/CheckDupId.module.css";
import {Content} from "antd/es/layout/layout";
import {Button,Form,Input} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";


const CheckDupId = () => {
    const [userId,setUserId] = useState('');
    const navigate = useNavigate();

    const handleCheck = async () => {
        try {
            let result = (await axios.get("http://localhost:8080/account/signup/{userId}"));
            if (result.status == 200) {
                alert('사용 가능한 아이디입니다.');
            }
            navigate("../../");

        } catch (e) {
            alert('중복된 아이디입니다.');
        }
    }

    return (
        <Content>
            <h1 className={styles.h1}>아이디 중복 검사</h1>
            <div className={styles.page_wrapper}>
                <Form className={styles.check_form} layout="inline">
                    <Form.Item name={"id"} label={"아이디"} rules={[{ required: true, message: '아이디를 입력하세요' }]}>
                        <Input placeholder={"아이디를 입력하세요."} value={userId} onChange={(e) => { setUserId(e.target.value); }}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type={"primary"} htmlType={"submit"} onClick={handleCheck}>중복확인</Button>
                    </Form.Item>
                </Form>
            </div>
        </Content>
    );
};

export default CheckDupId;
