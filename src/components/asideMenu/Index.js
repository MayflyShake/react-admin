import React, { Component, Fragment } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { Menu } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import Router from '../../router/Index'

const { SubMenu } = Menu;

class AsideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:[],
            openKeys:[]
        }
    }
    
    componentDidMount(){
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split("/").slice(0,3).join("/");
        console.log(pathname);
        console.log(menuKey);
        const menuHigh = {
            selectedKeys:pathname,
            openKeys:menuKey
        }
        this.selectMenuHigh(menuHigh)
    }

    selectMenu = ({item,key,keyPath,domEvent}) => {
        console.log(key);
        console.log(keyPath);
        const menuHigh = {
            selectedKeys:key,
            openKeys:keyPath[keyPath.length - 1]
        }
        this.selectMenuHigh(menuHigh);
    }

    openMenu = (openKeys) => {
        this.setState({
            openKeys:[openKeys[openKeys.length - 1]]
        })
    }

    selectMenuHigh = ({selectedKeys,openKeys}) => {
        this.setState({
            selectedKeys:[selectedKeys],
            openKeys:[openKeys]
        })
    }

    renderSubMenu = ({ title, key, child }) => {
        return (
            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {child && child.map(item => {
                    return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                })}
            </SubMenu>
        )
    }

    renderMenu = ({ title, key }) => {
        return (
            <Menu.Item key={key}>
                <Link to={key}><span>{title}</span></Link>
            </Menu.Item>
        )
    }

    render() {
        const {selectedKeys,openKeys} = this.state;
        return (
            <Fragment>
                <Menu
                    onClick={this.selectMenu}
                    onOpenChange={this.openMenu}
                    mode="inline"
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100%' }}
                    theme="dark"
                >
                    {
                        Router && Router.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }
                </Menu>
            </Fragment>
        );
    }
}

export default withRouter(AsideMenu);