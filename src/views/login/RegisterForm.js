import React, { Component, Fragment } from 'react';

//import "./index.scss"
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import Code from '../../components/code/index';
import {validate_pass} from '../../utils/validate'
import {Register} from '../../api/account';

import CryptoJs from 'crypto-js'

class RegisterForm extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password:"",
            code:"",
            module:"register"
        }
    }
    
    onFinish = values => {
        const requestData = {
            username: this.state.username,
            password:CryptoJs.MD5(this.state.password),
            code:this.state.code
        }
        Register(requestData).then(response => {
            const data = response.data;
            message.success(data.message)
            if(data.resCode === 0){
                this.toggleForm();
            }
        }).catch(error => {

        })
    };

    toggleForm = () => {
        this.props.switchForm("login")
    }

    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    inputChangeP = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
        })
    }

    inputChangeC = (e) => {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }

    render() {
        const {username,module} = this.state;
        return (

            <Fragment>
                <div className="form-header">
                    <h4 className="column">註冊</h4>
                    <span onClick={this.toggleForm}>登錄</span>
                </div>
                <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '郵箱不能為空!' },{ type: "email", message: '郵箱格式不正確' }]}
                        >
                            <Input onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="請輸入郵箱" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '密碼不能為空!' },
                                    ({getFieldValue}) => ({
                                        validator(rule,value){
                                            let passwords_value = getFieldValue("passwords");
                                            if(!validate_pass(value)){
                                                return Promise.reject("請輸入大於6位小於20位的數字+字母!");
                                            }
                                            if(passwords_value && value !== passwords_value){
                                                return Promise.reject("兩次密碼不一致!");
                                            }
                                            return Promise.resolve();
                                        }
                                    })
                                ]}
                        >
                            <Input onChange={this.inputChangeP} type="password" prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="請輸入密碼" />
                        </Form.Item>
                        <Form.Item
                            name="passwords"
                            rules={[{ required: true, message: '再次確認密碼不能為空!' },
                                    ({getFieldValue}) => ({
                                        validator(rule,value){
                                            if(value !== getFieldValue("password")){
                                                return Promise.reject("兩次密碼不一致!")
                                            }
                                            return Promise.resolve();
                                        }
                                    })
                                    ]}
                        >
                            <Input type="password" prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="請再次輸入" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '請輸入長度為6位的字符!' ,len:6}]}
                        >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeC} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="請輸入驗證碼" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>註冊</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

export default RegisterForm;