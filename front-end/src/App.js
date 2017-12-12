import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import NavBar from './NavBar'
import SlickSlider from './components/SlickSlider'
import Register from './containers/Register'


class App extends Component {
  render() {
    return (
      <Router>
        <div id="container-fluid" className="App">
          <NavBar />
          <Route exact path='/' component={SlickSlider}/>
          <Route exact path='/register' component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;
