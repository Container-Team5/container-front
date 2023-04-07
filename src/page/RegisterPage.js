import {Form,Input} from 'antd';
import React from 'react';
import styles from "../component/RegisterPage.module.css";

const RegisterPage = (props) => {
    const [form] = Form.useForm();


    return (
        <Form form={form} style={{maxWidth:600}}>

            <Form>
                <Form.Item label="Username"><Input placeholder="Enter Username"/></Form.Item>
                <Form.Item label="Password" rules={[
                    {
                        required : true,
                        message : 'Please input your username.'
                    },
                    {
                        patten: /^[\s]/,
                        message : 'Please do not use space.',
                    }
                ]}><Input.Password placeholder="Enter Password"/></Form.Item>
                <Form.Item label="Confirm"><Input placeholder="Re-enter Password"/></Form.Item>
            </Form>
            <Form>

            </Form>




        </Form>
    );
};

export default RegisterPage;