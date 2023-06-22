import React  from 'react';
import {
    Button,
    Form,
    InputNumber,

} from 'antd';

import axios from "axios";

const Mapping = () => {
    const [newContainer] = Form.useForm()
    const registerContainer = async () => {
        let formValue
        let canRegister = false
        try {
            formValue = await newContainer.validateFields()
            canRegister = true
        } catch (e) {
            alert('필수값은 모두 입력하여야합니다.')
        }
        if(!canRegister) return
        try {
            let result = (await axios.put(`http://localhost:8080/palette/${formValue.paletteId}/container/${formValue.containerId}`,{},
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
                }));
            if(result.status === 200 ) {
                alert('매핑되었습니다.')
            }
        } catch(e){
            alert('매핑 실패하였습니다.')
        }
    }
    return (
        <Form className="mapping" form={newContainer} >

            <Form.Item label="컨테이너ID" name="containerId" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="팔레트ID" name="paletteId" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>

            <Form.Item>
                <Button className="submit" htmlType="submit" onClick={registerContainer}>매핑</Button>
            </Form.Item>
        </Form>
    );
};

export default Mapping;
