import React, { Component, Fragment } from 'react';

import "./index.scss"
import { Form, Input, Button, Row, Col,message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import {validate_password} from '../../utils/validate'
import {Login,GetCode} from '../../api/account'

class LoginForm extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            code_button_loading: false,
            code_button_disabled:false,
            code_button_text: "獲取驗證碼"
        }
    }

    onFinish = values => {
        Login().then(response => {
            console.log(response);
        }).catch(error => {

        })
        console.log('Received values of form: ', values);
    };

    getCode = () => {
        if(!this.state.username){
            message.warning("用戶名不能為空!",1);
            return false;
        }
        this.setState({
            code_button_loading:true,
            code_button_text: "發送中"
        })
        const requestData = {
            username: this.state.username,
            module: "login"
        }
        GetCode(requestData).then(response => {
            this.countDown();
        }).catch(error => {
            this.setState({
                code_button_loading:false,
                code_button_text: "重新獲取"
            })
        })
    }

    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }

    countDown = () => {
        let timer = null;
        let sec = 5;
        this.setState({
            code_button_loading:false,
            code_button_disabled:true,
            code_button_text: `${sec}S`
        })
        timer = setInterval(() => {
            sec--;
            if(sec <= 0){
                this.setState({
                    code_button_text:"重新獲取",
                    code_button_disabled:false
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                code_button_text:`${sec}S`
            })
        },1000)
        
    }

    toggleForm = () => {
        this.props.switchForm("register")
    }

    render() {
        const { username,code_button_loading,code_button_text,code_button_disabled} = this.state;
        // const _this = this;
        return (

            <Fragment>
                <div className="form-header">
                    <h4 className="column">登錄</h4>
                    <span onClick={this.toggleForm}>賬號註冊</span>
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
                            rules={[{ required: true, message: '郵箱不能為空' }, { type: "email", message: '郵箱格式不正確' },
                            // ({ getFieldValue }) => ({
                            //         validator(rule, value) {
                            //           if (validate_email(value)) {
                            //               _this.setState({
                            //                 code_button_disabled:false
                            //               })
                            //             return Promise.resolve();
                            //           }
                            //           return Promise.reject("郵箱格式不正確");
                            //         },
                            //       })
                                ]}
                        >
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '密碼不能為空' }, 
                                { pattern: validate_password,message:"請輸入大於6位小於20位的數字+字母"}
                                // ({ getFieldValue }) => ({
                                //     validator(rule, value) {
                                //       if (value.length < 6) {
                                //         return Promise.reject("不能小於6位");
                                //       }
                                //       return Promise.resolve();
                                //     },
                                //   })
                                // { min: 6, message: '不能小於6位' }, 
                                // { max: 20, message: '不能大於20位' }
                            ]}
                        >
                            <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="字母+數字,大於6位 小於20位" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '驗證碼不能為空' },{ len: 6, message: '請輸入長度為6位的驗證碼' }]}
                        >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                        <Button type="danger" loading={code_button_loading} block disabled={code_button_disabled} onClick={this.getCode}>{code_button_text}</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>登錄</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

export default LoginForm;