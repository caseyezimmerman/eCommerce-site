////THIRD PARTY MODULES
import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 


//////CUSTOM COMPONENTS
import NavBar from './NavBar'
import SlickSlider from './components/SlickSlider'
import Register from './containers/Register'
import Home from './components/Home'
import Login from './containers/Login'
import Logout from './containers/Logout'
import ProductLines from './containers/ProductLines'
import Cart from './containers/Cart'




class App extends Component {
  render() {
    return (
      <Router>
        <div id="container-fluid" className="App">
          <NavBar />
          <Route exact path='/' component={SlickSlider}/>
          <div className="container">
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route path='/shop/:productLine' component={ProductLines} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/cart' component={Cart} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
