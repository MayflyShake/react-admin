import React, { Component, Fragment } from 'react';
import {withRouter} from 'react-router-dom';
import "./index.scss"
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import {validate_password} from '../../utils/validate';
import {Login} from '../../api/account';
import Code from '../../components/code/index';

import CryptoJs from 'crypto-js'

import {setToken} from '../../utils/session'

class LoginForm extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            password:"",
            code:"",
            module:"login",
            loading:false
        }
    }

    onFinish = values => {
        const requestData = {
            username: this.state.username,
            password:CryptoJs.MD5(this.state.password),
            code:this.state.code
        }
        this.setState({
            loading:true
        })
        Login(requestData).then(response => {
            console.log(response);
            this.setState({
                loading:false
            })
            const data = response.data.data;
            setToken(data.token)
            this.props.history.push('/index');
        }).catch(error => {
            this.setState({
                loading:false
            })
        })
        console.log('Received values of form: ', values);
    };

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

    toggleForm = () => {
        this.props.switchForm("register")
    }

    render() {
        const { username,module,loading} = this.state;
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
                            rules={[{ required: true, message: '郵箱不能為空' }, { type: "email", message: '郵箱格式不正確' }
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
                            <Input type="password" onChange={this.inputChangeP} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="字母+數字,大於6位 小於20位" />
                        </Form.Item>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '驗證碼不能為空' },{ len: 6, message: '請輸入長度為6位的驗證碼' }]}
                        >
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeC} prefix={<UnlockOutlined className="site-form-item-icon" />} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module}/>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading} className="login-form-button" block>登錄</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(LoginForm);