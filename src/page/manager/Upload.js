import React, { useState } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import styles from "../manager/DataManage.css";

const Upload = () => {

    /* FORM 템플릿 코드
    <Form.Item label="Select">
        <Select>
            <Select.Option value="demo">Demo</Select.Option>
        </Select>
    </Form.Item>
    <Form.Item label="TreeSelect">
        <TreeSelect
            treeData={[
                { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
        />
    </Form.Item>
    <Form.Item label="Cascader">
        <Cascader
            options={[
                {
                    value: 'zhejiang',
                    label: 'Zhejiang',
                    children: [{ value: 'hangzhou', label: 'Hangzhou' }],
                },
            ]}
        />
    </Form.Item>
    */

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

            <Form.Item label="출고마감시간">
                <DatePicker />
            </Form.Item>

            <Form.Item label="">
                <Button>UPLOAD</Button>
            </Form.Item>
        </Form>
    );
};

export default Upload;
