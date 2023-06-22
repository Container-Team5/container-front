import {SearchOutlined} from '@ant-design/icons';
import {Button, DatePicker, Form, Input, InputNumber} from "antd";


const PaletteTabControl = (props) => {
    const [searchParam] = Form.useForm()


    const onSearch = async () => {
        let formValue = await searchParam.validateFields()
        let searchParamRequest = {...formValue}
        // dLine을 format에 맞는 문자열로 바꿔줌
        if(formValue.dLineFrom !== undefined){
            searchParamRequest.dLineFrom = formValue.dLineFrom.format().replace('+09:00','')
        }

        if(formValue.dLineTo !== undefined){
            searchParamRequest.dLineTo = formValue.dLineTo.format().replace('+09:00','')
        }

        props.paletteRef.current.search(searchParamRequest)
    };

    return (
        <Form form={searchParam} labelCol={{span: 12,}} wrapperCol={{span: 20,}} layout="vertical">
            <Form.Item label={'\u00A0\u00A0 팔레트ID'} name="paletteId">
                <InputNumber/>
            </Form.Item>
            <Form.Item label={'\u00A0\u00A0 상품명'} name="pName">
                <Input/>
            </Form.Item>
            <Form.Item label={'\u00A0\u00A0 출고마감시간'} name="dLineFrom">
                <DatePicker  format="YYYY-MM-DDTHH:mm" showTime/>
            </Form.Item>
            <Form.Item label={'\u00A0\u00A0 ~'} name="dLineTo">
                <DatePicker format="YYYY-MM-DDTHH:mm" showTime/>
            </Form.Item>
            <Button icon={<SearchOutlined/>} onClick={onSearch}>Search</Button>

        </Form>
    )
}

export default PaletteTabControl