import {Content} from "antd/es/layout/layout";
import styles from "../../component/RegisterPage.module.css";
import {Form,Input,Radio,Select,Button} from "antd";
import React, {useState,useCallback} from 'react';
import useInput from '@/hooks/useInput';
import LoginPageHeader from "../../component/LoginPageHeader";
import {useDaumPostcodePopup} from "react-daum-postcode";

const { Option }= Select;


const Register = (props) => {
    const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const open = useDaumPostcodePopup(scriptUrl);
    const [address,setAddress] = useState('');
    const [addr,setAddr] = useState('');
    const [extraAddress,setExtraAddress] = useState('');
    const [password, onChangePassword] = useInput('');



    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4},
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        }
    }

    const [admin_informDisabled, setAdmin_informDisabled] = useState (true);
    const [user_informDisabled, setUser_informDisabled] = useState(true);

    const prefixSelector = (
        <Form.Item name={"prefix"} noStyle>
            <Select style={
                {width :80}
            }>
                <Option value={"010"}>010</Option>
                <Option value={"011"}>011</Option>
            </Select>
        </Form.Item>
    );

    const checkId = (value) => {
        console.log(value);
        window.open("/account/Register/checkDup","form","width=700, height=400, left=410, top=250");
    };


    const moveAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if(data.addressType === 'R') {
            if(data.bname !== '') {
                extraAddress += data.bname;
            }
            if(data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress!== ''? `(${extraAddress})` : '';
        }
        setAddress(data.zonecode);
        setAddr(data.address);
        setExtraAddress(extraAddress);
        console.log(fullAddress);
    };
    const handleClick= () => {
        open({onComplete : moveAddress });
    };

    const validatePassword = useCallback((_, value) => {
        const regExp = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{1,50})(?=.*[A-Z]{1,50}).{8,50}$/;
        if (!value) {
            return Promise.reject(new Error('비밀번호는 필수 항목입니다.'));
        }
        if (!regExp.test(value)) {
            return Promise.reject(new Error('비밀번호는 8~50자이며 영문 소문자, 영문 대문자, 숫자, 특수문자를 모두 포함해야 합니다.'));
        }
        return Promise.resolve();
    }, []);


    const checkPhone = (phone) => {
        if (phone.length < 8 || phone.length >8) {
            return false;
        }
        if(/-/.test(phone)) {
            return false;
        }
        if (/[A-Z]/.test(phone)) {
            return false;
        }
        if (/[a-z]/.test(phone)) {
            return false;
        }
        return true;
    }

    return (
        <Content>
            <div className={styles.page_wrapper}>
                <LoginPageHeader/>

                <div className={styles.page_middle}>
                    <div className={styles.middle_register}>
                        <p className={styles.font_style}>공통 정보 입력</p>
                        <Form initialValues={{prefix:"010"}} className={styles.register_form} {...formItemLayout}>
                            <Form.Item name={"text"} label={"저는"} rules={[{required:true,message: 'Please select your Position!'}]}>
                                <Radio.Group>
                                    <Radio.Button value={"Administrator"} onChange={(e) => {setAdmin_informDisabled(false);setUser_informDisabled(true)}}>관리자입니다.</Radio.Button>
                                    <Radio.Button value={"User"} onChange={(e) => {setAdmin_informDisabled(true);setUser_informDisabled(false)}}>사용자입니다.</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name={"id"} label={"아이디"} rules={[{required: true, message: 'Please input your Id!'}]}>
                                <Input placeholder={"아이디를 입력하세요."}/>
                                <Button className={styles.idCheck} type={"primary"} onClick={checkId}>아이디 중복체크</Button>
                            </Form.Item>
                            <Form.Item name={"password"} label={"비밀번호"} rules={[{ validator : validatePassword }]}>
                                <Input.Password placeholder={"비밀번호를 입력하세요."} value={password} onChange={onChangePassword} />
                                8~16자 영문,숫자,특수문자를 사용하세요.
                            </Form.Item>
                            <Form.Item name="confirm" label="비밀번호 확인" dependencies={['password']} hasFeedback rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder={"비밀번호를 재입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"phone"} label={"연락처"} rules={[{required:true,message: 'Please input your Phone Number!'}]}>
                                <Input addonBefore={prefixSelector} placeholder={"'-'를 제외한 8자리 번호를 입력하세요."} onChange={checkPhone}/>
                            </Form.Item>
                        </Form>
                        <hr/>
                        <p className={styles.font_style}>관리자 정보 입력</p>
                        <Form className={styles.register_form} disabled={admin_informDisabled ? true : false} {...formItemLayout}>
                            <Form.Item name={"admin"} label={"관리자명"} rules={[{required:true,message: 'Please enter your Name!'}]}>
                                <Input placeholder={"관리자명을 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"depart"} label={"부서"} rules={[{required:true,message: 'Please enter your Position!'}]}>
                                <Input placeholder={"부서명을 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"position"} label={"직책"} rules={[{required:true,message: 'Please enter your Position!'}]}>
                                <Input placeholder={"직책명을 입력하세요."}/>
                            </Form.Item>
                        </Form>
                        <hr/>
                        <p className={styles.font_style}>사용자 정보 입력</p>
                        <Form className={styles.register_form} disabled={user_informDisabled? true : false} {...formItemLayout}>
                            <Form.Item name={""} label={"우편번호"} rules={[{required:true,message: 'Please enter your Address!'}]}>
                                <Form layout={"inline"}>
                                    <Form.Item><Input placeholder={"우편번호"} value={address}/></Form.Item>
                                    <Form.Item><Button type={"primary"} onClick={handleClick}>우편번호 검색</Button></Form.Item>
                                </Form>
                            </Form.Item>
                            <Form.Item name={""} label={"주소"} rules={[{required:true,message:'Please enter Your Address!'}]}>
                                <Form.Item><Input placeholder={"주소"} value={addr}/></Form.Item>
                                <Form layout={"inline"}>
                                    <Form.Item><Input placeholder={"상세주소"} /></Form.Item>
                                    <Form.Item><Input placeholder={"참고항목"} className={styles.address_style} value={extraAddress}/></Form.Item>
                                </Form>
                            </Form.Item>
                            <Form.Item name={"company"} label={"물류업체명"} rules={[{required:true,message: 'Please enter Company Name!'}]}>
                                <Input placeholder={"물류업체명을 입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"represent"} label={"대표자"} rules={[{required:true,message: 'Please enter Representative!'}]}>
                                <Input placeholder={"대표자명을 입력하세요."}/>
                            </Form.Item>
                        </Form>
                        <Form.Item className={styles.middle_register_button}>
                            <Button className={styles.middle_register_button_1}>이전</Button>
                            <Button type={"primary"} className={styles.middle_register_button_2}>가입하기</Button>
                        </Form.Item>
                    </div>
                </div>


                <footer className={styles.page_footer}>
                    <h3>컨테이너의 모든 것</h3>
                </footer>
            </div>
        </Content>
    )
}

export default Register;