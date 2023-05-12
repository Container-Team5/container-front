import {Content} from "antd/es/layout/layout";
import styles from "../../component/RegisterPage.module.css";
import {Form,Input,Radio,Select,Button} from "antd";
import React, {useState} from 'react';
import LoginPageHeader from "../../component/LoginPageHeader";
const { Option }= Select;

const Register = (props) => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

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
    const moveAddress = (value) => {
        console.log(value);
        window.open("/account/Register/address", "form", "width=700, height=400, left=410, top=250");

    };

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
                            <Form.Item name={"password"} label={"비밀번호"} rules={[{required: true, message: 'Please input your Password!'}]} hasFeedback>
                                <Input.Password name={"password"} placeholder={"비밀번호를 입력하세요."}/>
                                8~16자 영문 대 소문자,숫자,특수문자를 사용하세요.
                            </Form.Item>
                            <Form.Item name={"confirm"} label={"비밀번호 확인"} dependencies={["password"]} hasFeedback rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}>
                                <Input.Password name={"confirm"} placeholder={"비밀번호를 재입력하세요."}/>
                            </Form.Item>
                            <Form.Item name={"phone"} label={"연락처"} rules={[{required:true,message: 'Please input your Phone Number!'}]}>
                                <Input addonBefore={prefixSelector} placeholder={"'-'를 제외한 8자리 번호를 입력하세요."}/>
                            </Form.Item>
                        </Form>
                            <hr/>
                            <p className={styles.font_style}>관리자 정보 입력</p>
                            <Form className={styles.register_form} disabled={admin_informDisabled ? true : false} {...formItemLayout}>
                                <Form.Item name={""} label={"관리자명"} rules={[{required:true,message: 'Please enter your Name!'}]}>
                                    <Input placeholder={"관리자명을 입력하세요."}/>
                                </Form.Item>
                                <Form.Item name={"text"} label={"부서"} rules={[{required:true,message: 'Please enter your Position!'}]}>
                                    <Input placeholder={"부서명을 입력하세요."}/>
                                </Form.Item>
                                <Form.Item name={"text"} label={"직책"} rules={[{required:true,message: 'Please enter your Position!'}]}>
                                    <Input placeholder={"직책명을 입력하세요."}/>
                                </Form.Item>
                            </Form>
                            <hr/>
                            <p className={styles.font_style}>사용자 정보 입력</p>
                            <Form className={styles.register_form} disabled={user_informDisabled? true : false} {...formItemLayout}>
                                <Form.Item name={""} label={"우편번호"} rules={[{required:true,message: 'Please enter your Address!'}]}>
                                    <Input placeholder={"'우편번호 검색'을 통해 주소를 입력하세요."}/>
                                    <Button className={styles.emailCheck} type={"primary"} onClick={moveAddress}>우편번호 검색</Button>
                                </Form.Item>
                                {/*<Form layout={"inline"} className={styles.register_form}>*/}
                                {/*    <Form.Item label={"상세주소"} rules={[{required:true,message: 'Please enter your Address!'}]}></Form.Item>*/}
                                {/*    <Form.Item><Input /></Form.Item>*/}
                                {/*    <Form.Item><Input /></Form.Item>*/}
                                {/*</Form>*/}
                                <Form.Item name={""} label={"주소"} rules={[{required:true,message:'Please enter Your Address!'}]}>
                                    <Form layout={"inline"}>
                                        <Form.Item><Input placeholder={"상세주소"} /></Form.Item>
                                        <Form.Item><Input placeholder={"참고항목"}/></Form.Item>
                                    </Form>
                                </Form.Item>
                                <Form.Item name={"text"} label={"물류업체명"} rules={[{required:true,message: 'Please enter Company Name!'}]}>
                                    <Input placeholder={"물류업체명을 입력하세요."}/>
                                </Form.Item>
                                <Form.Item name={"text"} label={"대표자"} rules={[{required:true,message: 'Please enter Representative!'}]}>
                                    <Input placeholder={"대표자명을 입력하세요."}/>
                                </Form.Item>
                            </Form>
                        <Form>
                            <Form.Item className={styles.middle_register_button}>
                                <Button className={styles.middle_register_button_1}>이전</Button>
                                <Button type={"primary"} htmlType={"submit"} className={styles.middle_register_button_2}>가입하기</Button>
                            </Form.Item>
                        </Form>
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