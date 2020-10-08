import React, { Component } from 'react';
import { Button, message } from 'antd';

import { GetCode } from '../../api/account';
import {validate_email} from '../../utils/validate'

let timer = null;

class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            button_text: "獲取驗證碼",
            button_loading:false,
            button_disabled:false,
            module:props.module
        }
    }

    componentWillReceiveProps({username}){
        this.setState({
            username
        })
    }
    
    componentWillUnmount(){
        clearInterval(timer);
    }

    getCode = () => {
        const username = this.state.username;
        if (!username) {
            message.warning("用戶名不能為空!", 1);
            return false;
        }
        if(!validate_email(username)){
            message.warning("郵箱格式不正確!", 1);
            return false;
        }
        this.setState({
            button_loading: true,
            button_text: "發送中"
        })
        const requestData = {
            username,
            module: this.state.module
        }
        GetCode(requestData).then(response => {
            message.success(response.data.message)
            this.countDown();
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: "重新獲取"
            })
        })
    }

    countDown = () => {
        let sec = 60;
        this.setState({
            button_loading: false,
            button_disabled: true,
            button_text: `${sec}S`
        })
        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_text: "重新獲取",
                    button_disabled: false
                })
                clearInterval(timer);
                return false;
            }
            this.setState({
                button_text: `${sec}S`
            })
        }, 1000)

    }

    render() {
        return <Button type="danger" block onClick={this.getCode} disabled={this.state.button_disabled} loading={this.state.button_loading}>{this.state.button_text}</Button>
    }
}

export default Code;