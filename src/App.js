import React from 'react';
import {Switch,Route, BrowserRouter} from 'react-router-dom'
//引用组件
import Login from './views/login/index'
import Index from './views/index/index'
import PrivateRouter from './components/privateRouter/Index'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact component={Login}  path="/"/>
            <PrivateRouter component={Index}  path="/index"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
