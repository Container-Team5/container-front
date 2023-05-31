import React, {useState} from 'react';
import {
    Button,
    DatePicker,
    Form,
    InputNumber,

} from 'antd';
import styles from "../manager/DataManage.css";
import axios from "axios";

const Upload = () => {
    const [newContainer] = Form.useForm()
    const registerContainer = async () => {
        let createContainerRequest
        let canRegister = false
        try {
            let formValue = await newContainer.validateFields()
            createContainerRequest = {...formValue}
            createContainerRequest.releaseDate = formValue.releaseDate.format().replace('+09:00', '')
            canRegister = true
        } catch (e) {
            alert('필수값은 모두 입력하여야합니다.')
        }
        if(!canRegister) return
        try {
            let result = (await axios.post("http://localhost:8080/container",createContainerRequest));
            if(result.status === 200 ) {
                alert('등록되었습니다.')
            }
        } catch(e){
            alert('등록 실패하였습니다.')
        }
    }
    return (
        <Form className="upload" form={newContainer} >

            <Form.Item label="무게(kg)" name="weight" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="무게제한(kg)" name="weightLimit" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="출고마감시간: " name="releaseDate" rules={[{required: true}]}>
                <DatePicker format="YYYY-MM-DDTHH:mm:ss" showTime/>
            </Form.Item>
            <Form.Item>
                <Button className="submit" htmlType="submit" onClick={registerContainer}>컨테이너 등록</Button>
            </Form.Item>
        </Form>
    );
};

export default Upload;