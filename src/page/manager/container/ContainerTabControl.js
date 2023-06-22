import {SearchOutlined} from '@ant-design/icons';
import {Button, DatePicker, Form, InputNumber} from "antd";


const ContainerTabControl = (props) => {
    const [searchParam] = Form.useForm()
    const createUpdate = () => {
        window.open("/upload", "a", "width=500, height=700, left=100, top=50"); // =팝업 띄우기
    };

    const createMapping = () => {
        window.open("/mapping", "a", "width=600, height=200, left=100, top=50");
    }

    const onSearch = async () => {
        let formValue = await searchParam.validateFields()
        let searchParamRequest = {...formValue}
        // dLine을 format에 맞는 문자열로 바꿔줌
        if(formValue.releaseDateFrom !== undefined){
            searchParamRequest.releaseDateFrom = formValue.releaseDateFrom.format().replace('+09:00','')
        }

        if(formValue.releaseDateTo !== undefined){
            searchParamRequest.releaseDateTo = formValue.releaseDateTo.format().replace('+09:00','')
        }

        props.containerRef.current.search(searchParamRequest)
    };

    return (
        <Form form={searchParam} labelCol={{span: 12,}} wrapperCol={{span: 20,}} layout="vertical">
            <Form.Item label={'\u00A0\u00A0 컨테이너 ID'} name="containerId">
                <InputNumber/>
            </Form.Item>
            <Form.Item label={'\u00A0\u00A0 출고마감시간'} name="releaseDateFrom">
                <DatePicker  format="YYYY-MM-DDTHH:mm" showTime/>
            </Form.Item>
            <Form.Item label={'\u00A0\u00A0 ~'} name="releaseDateTo">
                <DatePicker format="YYYY-MM-DDTHH:mm" showTime/>
            </Form.Item>
            <Button icon={<SearchOutlined/>} onClick={onSearch}>Search</Button>
            <Button className="button" type="primary" onClick={createUpdate}>UPLOAD</Button><br/>
            <Button className="button" type="primary" onClick={createMapping}>MAPPING</Button>
        </Form>
    )
}

export default ContainerTabControl