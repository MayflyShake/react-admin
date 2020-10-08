import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRouter from '../privateRouter/Index';

import Components from "./components"
class ContainerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Switch>
        {
          Components.map(item => {
            return <PrivateRouter exact key={item.path} component={item.component} path={item.path} />
          })
        }
      </Switch>
    );
  }
}

export default ContainerMain;
