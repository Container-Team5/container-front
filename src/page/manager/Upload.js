import React, { useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    InputNumber,

} from 'antd';
import styles from "../manager/DataManage.css";
import dayjs from "dayjs";

const Upload = () => {
    return (
        <Form className={styles.uploadForm}>
            <Form.Item label="컨테이너 ID">
                <InputNumber />
            </Form.Item>
            <Form.Item label="가로(m)">
                <InputNumber />
            </Form.Item>
            <Form.Item label="세로(m)">
                <InputNumber />
            </Form.Item>
            <Form.Item label="높이(m)">
                <InputNumber />
            </Form.Item>
            <Form.Item label="부피(m^3)">
                <InputNumber />
            </Form.Item>
            <Form.Item label="무게(kg)">
                <InputNumber />
            </Form.Item>
            <Form.Item label="무게제한(kg)">
                <InputNumber />
            </Form.Item>
            <Form.Item label="출고마감시간: ">
                <DatePicker
                    format="YYYY-MM-DDTHH:mm:ss"
                    showTime={{defaultValue: dayjs('00:00:00', 'HH:mm:ss'),}}
                />
            </Form.Item>
            <Form.Item label="">
                <Button>컨테이너 등록</Button>
            </Form.Item>
        </Form>
    );
};

export default Upload;
