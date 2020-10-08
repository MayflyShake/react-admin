import React, { Component } from 'react';
import "./aside.scss"
import AsideMenu from '../../../components/asideMenu/Index'

class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <AsideMenu/>
        );
    }
}

export default Aside;