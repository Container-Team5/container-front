import {Button, DatePicker, Form, Input, InputNumber,} from 'antd';
import axios from "axios";


const GoodsRegister = (props) => {
    const [newPallete] = Form.useForm()

    const registerPallete = async () => {
        let createPaletteRequest
        let canRegister = false
        try {
            // formValue를 유효성 검사한 후 통과하면 form의 데이터를 가져옴
            let formValue = await newPallete.validateFields()
            createPaletteRequest = {...formValue}
            // dLine을 format에 맞는 문자열로 바꿔줌
            createPaletteRequest.dLine = formValue.dLine.format().replace('+09:00', '')
            canRegister = true
        } catch (e) {
            alert('필수값은 전부 입력해야합니다.')
        }
        if (!canRegister) return
        try {
            let result = (await axios.post("http://localhost:8080/palette",
                createPaletteRequest,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('accessToken')}`,},
                }
            ));
            if (result.status === 200)
                alert('등록되었습니다.')
        } catch (e) {
            console.log(e)
            alert('등록 실패하였습니다.')
        }
    }

    return (
        <Form form={newPallete} labelCol={{span: 4,}} wrapperCol={{span: 14,}} layout="horizontal">
            <Form.Item label="상품명 : " name="pName" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="수량: " name="quantity" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>

            <Form.Item label="높이(m): " name="height" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="무게(kg): " name="weight" rules={[{required: true}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item label="출고마감시간: " name="dLine" rules={[{required: true}]}>
                <DatePicker format="YYYY-MM-DDTHH:mm" showTime/>
            </Form.Item>
            <Form.Item label="1차 배송지: " name="firstDel" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label="최종 배송지: " name="finalDel" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" onClick={registerPallete}>상품등록</Button>
            </Form.Item>
        </Form>
    );
};

export default GoodsRegister;