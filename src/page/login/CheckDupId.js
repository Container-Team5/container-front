import React, { useState } from 'react';
import styles from "../../component/CheckDupId.module.css";
import {Content} from "antd/es/layout/layout";
import {Button,Form,Input} from 'antd';

const Upload = () => {
    return (
        <Content>
            <h1 className={styles.h1}>아이디 중복 검사</h1>
            <div className={styles.page_wrapper}>
                <Form className={styles.check_form} layout="inline">
                    <Form.Item name={"id"} label={"아이디"}>
                        <Input placeholder={"아이디를 입력하세요."}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type={"primary"}>중복확인</Button>
                    </Form.Item>
                </Form>
            </div>
        </Content>
    );
};

export default Upload;
