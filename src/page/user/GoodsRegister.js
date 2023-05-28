import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
} from 'antd';
import {useRef, useState} from 'react';
import axios from "axios";
import dayjs from "dayjs";


const GoodsRegister = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };

    const [newPallete, setNewPallete] =// Form.useForm();
        useState({
            pId: '',
            pName: '',
            quantity: '',
            width: '',
            length: '',
            height: '',
            volume: '',
            weight: '',
            dLine: '',
            firstDel: '',
            finalDel: '',
        });

    const updatePid = (e) => {
        setNewPallete({...newPallete, pId: e.target.value})
    }
    const updatePName = (e) => {
        setNewPallete({...newPallete, pName: e.target.value})
    }
    const updateQuantity = (e) => {
        setNewPallete({...newPallete, quantity: e})
    }
    const updateWidth = (e) => {
        setNewPallete({...newPallete, width: e})
    }
    const updateLength = (e) => {
        setNewPallete({...newPallete, length: e})
    }
    const updateHeight = (e) => {
        setNewPallete({...newPallete, height: e})
    }
    const updateVolume = (e) => {
        setNewPallete({...newPallete, volume: e})
    }
    const updateWeight = (e) => {
        setNewPallete({...newPallete, weight: e})
    }
    const updateDLine = (date,dateString) => {
        console.log(date())
        console.log(dateString())
        //setNewPallete({...newPallete, dLine: date})
    }
    const updateFirstDel = (e) => {
        setNewPallete({...newPallete, firstDel: e.target.value})
    }
    const updateFinalDel = (e) => {
        setNewPallete({...newPallete, finalDel: e.target.value})
    }

    const registerPallete = async () => {
        let result = (await axios.post("http://localhost:8080/api/palette", newPallete)).data
        console.log(result)
    }


    return (
        <Form
            labelCol={{span: 4,}}
            wrapperCol={{span: 14,}}
            layout="horizontal"
            initialValues={{size: componentSize,}}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{maxWidth: 600}}
        >
            <Form.Item label="팔레트ID: ">
                <Input value={newPallete.pId} onChange={updatePid}/>
            </Form.Item>
            <Form.Item label="상품명 : ">
                <Input value={newPallete.pName} onChange={updatePName}/>
            </Form.Item>
            <Form.Item label="수량: ">
                <InputNumber value={newPallete.quantity} onChange={updateQuantity}/>
            </Form.Item>
            <Form.Item label="가로(m): ">
                <InputNumber value={newPallete.width} onChange={updateWidth}/>
            </Form.Item>
            <Form.Item label="세로(m): ">
                <InputNumber value={newPallete.length} onChange={updateLength}/>
            </Form.Item>
            <Form.Item label="높이(m): ">
                <InputNumber value={newPallete.height} onChange={updateHeight}/>
            </Form.Item>
            <Form.Item label="부피(m^3): ">
                <InputNumber value={newPallete.volume} onChange={updateVolume}/>
            </Form.Item>
            <Form.Item label="무게(kg): ">
                <InputNumber value={newPallete.weight} onChange={updateWeight}/>
            </Form.Item>
            <Form.Item label="출고마감시간: ">
                <DatePicker
                    format="YYYY-MM-DDTHH:mm:ss"
                    showTime={{defaultValue: dayjs('00:00:00', 'HH:mm:ss'),}}
                    value={newPallete.dLine}
                    onChange={updateDLine}
                />
            </Form.Item>
            <Form.Item label="1차 배송지: ">
                <Input value={newPallete.firstDel} onChange={updateFirstDel}/>
            </Form.Item>
            <Form.Item label="최종 배송지: ">
                <Input value={newPallete.finalDel} onChange={updateFinalDel}/>
            </Form.Item>
            <Form.Item>
                <Button onClick={registerPallete}>상품등록</Button>
            </Form.Item>
        </Form>
    );
};

export default GoodsRegister;