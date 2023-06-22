import {Content} from "antd/es/layout/layout";
import styles from "../../component/RegisterPage.module.css";
import {Form,Input,Radio,Select,Button} from "antd";
import React, {useState,useCallback} from 'react';
import useInput from './useInput';
import LoginPageHeader from "../../component/LoginPageHeader";
import {useDaumPostcodePopup} from "react-daum-postcode";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const { Option }= Select;



const Register = (props) => {
    const scriptUrl = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    const navigate = useNavigate();
    const open = useDaumPostcodePopup(scriptUrl);
    const [address,setAddress] = useState('');
    const [addr,setAddr] = useState('');
    const [extraAddress,setExtraAddress] = useState('');
    const [pwd, onChangePassword] = useInput('');
    const [number, onChangeNumber] = useInput('');
    const [msg,setMsg] = useState('');

    /*DB 연동*/
    const [userId,setUserId] = useState('');
    const [password,setPassword] = useState('');
    const [admCall,setAdmCall] = useState('');
    const [department,setDepartment] = useState('');
    const [position,setPosition] = useState('');
    const [facName,setFacName] = useState('');
    const [adName,setAdName] = useState('');
    const [rep,setRep] = useState('');
    const [location,setLocation] = useState('');
    const [role,setRole] = useState('');

    const signUpRequest = {
        "userId": userId,
        "password": password,
        "admCall" : admCall,
        "department" : department,
        "position" : position,
        "facName" : facName,
        "adName" : adName,
        "rep" : rep,
        "location" : location,
        "role" : role,
    };

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
                <Option value={"016"}>016</Option>
                <Option value={"017"}>017</Option>
            </Select>
        </Form.Item>
    );

    const checkId = async() => {
        // console.log(value);
        // window.open("/account/Register/checkDup","form","width=700, height=400, left=410, top=250");
        try {
            let result = (await axios.get("http://localhost:8080/account/checkid/"+userId))

            console.log(result);
            if (result.status == 200) {
                setMsg('사용가능한 아이디입니다.');
            }
        } catch (e) {
            setMsg('중복된 아이디입니다.');
        };
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
        const regExp = /(?=.*\d{1,20})(?=.*[~`!@#$%\^&*()-+=]{1,20})(?=.*[a-z]{1,20}||[A-z]{1,20}).{5,20}$/;
        if (!value) {
            return Promise.reject(new Error('비밀번호는 필수 항목입니다.'));
        }
        if (!regExp.test(value)) {
            return Promise.reject(new Error('비밀번호는 5~20자이며 영문, 숫자, 특수문자를 모두 포함해야 합니다.'));
        }
        return Promise.resolve();
    }, []);

    const validateNumber = useCallback((_,value) => {
        const phnExp = /(?=.*\d{1,8}).{8}$/;
        if (!value) {
            return Promise.reject(new Error('전화번호는 필수 항목입니다.'));
        }
        if(value.length > 8) {
            return Promise.reject(new Error('전화번호는 -를 제외한 8자리 숫자를 입력해야 합니다.'));
        }
        if (!phnExp.test(value)) {
            return Promise.reject(new Error('전화번호는 -를 제외한 8자리 숫자를 입력해야 합니다.'));
        }
        if(phnExp.test(value)) {
            setAdmCall (value);
        }
        return Promise.resolve();
    }, []);

    const registerUser = async () => {
        console.log(signUpRequest);

        try {
            let result = (await axios.post("http://localhost:8080/account/signup",signUpRequest));
            if (result.status == 200) {
                console.log(result);
                localStorage.setItem("accessToken", result.data.accessToken)
                localStorage.setItem("refreshToken", result.data.refreshToken)

                alert('회원가입 되었습니다.');
                navigate('../account');
            }
        } catch (e) {
            alert('회원정보를 올바르게 입력해주세요.');
        }
    };

    return (
        <Form>
            <div className={styles.page_wrapper}>
                <LoginPageHeader/>

                <div className={styles.page_middle}>
                    <div className={styles.middle_register}>
                        <p className={styles.font_style}>공통 정보 입력</p>
                        <Form initialValues={{prefix:"010"}} className={styles.register_form} {...formItemLayout}>
                            <Form.Item name={"text"} label={"저는"} rules={[{required:true,message: 'Please select your Position!'}]}>
                                <Radio.Group>
                                    <Radio.Button value={"ROLE_ADMIN"} onChange={(e) => {setAdmin_informDisabled(false);setUser_informDisabled(true); setRole('ROLE_ADMIN')}}>관리자입니다.</Radio.Button>
                                    <Radio.Button value={"ROLE_USER"} onChange={(e) => {setAdmin_informDisabled(true);setUser_informDisabled(false); setRole('ROLE_USER')}}>사용자입니다.</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name={"id"} label={"아이디"} rules={[{required: true, message: 'Please input your Id!'}]}>
                                <Input placeholder={"아이디를 입력하세요."} onChange={(e) => { setUserId(e.target.value); }} value={userId}/>
                                <Button className={styles.idCheck} onClick={checkId}>아이디 중복체크</Button>
                                <text>{msg}</text>
                            </Form.Item>
                            <Form.Item name={"password"} label={"비밀번호"} rules={[{ validator : validatePassword }]}>
                                <Input.Password placeholder={"비밀번호를 입력하세요."} value={pwd} onChange={onChangePassword} />
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
                                            return Promise.reject(new Error('입력한 비밀번호와 일치하지 않습니다.'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder={"비밀번호를 재입력하세요."} onChange={(e) => { setPassword(e.target.value); }} value={password}/>
                            </Form.Item>
                            <Form.Item name={"phone"} label={"연락처"} rules={[{ validator : validateNumber}]}>
                                <Input addonBefore={prefixSelector} placeholder={"'-'를 제외한 8자리 번호를 입력하세요."} value={number} onChange={onChangeNumber}/>
                            </Form.Item>
                        </Form>
                        <hr/>
                        <p className={styles.font_style}>관리자 정보 입력</p>
                        <Form className={styles.register_form} disabled={admin_informDisabled ? true : false} {...formItemLayout}>
                            <Form.Item name={"admin"} label={"관리자명"} rules={[{required:true,message: 'Please enter your Name!'}]}>
                                <Input placeholder={"관리자명을 입력하세요."}  onChange={(e) => { setAdName(e.target.value); }}/>
                            </Form.Item>
                            <Form.Item name={"depart"} label={"부서"} rules={[{required:true,message: 'Please enter your Position!'}]}>
                                <Input placeholder={"부서명을 입력하세요."} onChange={(e) => { setDepartment(e.target.value); }}/>
                            </Form.Item>
                            <Form.Item name={"position"} label={"직책"} rules={[{required:true,message: 'Please enter your Position!'}]}>
                                <Input placeholder={"직책명을 입력하세요."} onChange={(e) => { setPosition(e.target.value); }}/>
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
                                    <Form.Item><Input placeholder={"참고항목"} className={styles.address_style} value={extraAddress}onChange={(e) => { setLocation(e.target.value); }}/></Form.Item>
                                </Form>
                            </Form.Item>
                            <Form.Item name={"company"} label={"물류업체명"} rules={[{required:true,message: 'Please enter Company Name!'}]}>
                                <Input placeholder={"물류업체명을 입력하세요."} onChange={(e) => { setFacName(e.target.value); }}/>
                            </Form.Item>
                            <Form.Item name={"represent"} label={"대표자"} rules={[{required:true,message: 'Please enter Representative!'}]}>
                                <Input placeholder={"대표자명을 입력하세요."} onChange={(e) => { setRep(e.target.value); }}/>
                            </Form.Item>
                        </Form>
                        <Form.Item className={styles.middle_register_button}>
                            <Button className={styles.middle_register_button_1}>이전</Button>
                            <Button type={"primary"} className={styles.middle_register_button_2} onClick={registerUser}>가입하기</Button>
                        </Form.Item>
                    </div>
                </div>


                <footer className={styles.page_footer}>
                    <h3>컨테이너의 모든 것</h3>
                </footer>
            </div>
        </Form>
    )
}

export default Register;