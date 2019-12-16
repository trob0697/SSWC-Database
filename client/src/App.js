import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './redux/store';
import './css/App.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Flowers from './pages/Flowers';
import FlowerInfo from './pages/FlowerInfo';
import Sightings from './pages/Sightings';
import SightingsInfo from './pages/SightingsInfo';
import Insert from './pages/Insert';

export default class App extends React.Component{
  render(){
    return(
      <Provider store={Store}>
        <Router>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/flowers' component={Flowers}/>
            <Route exact path='/flower-info' component={FlowerInfo}/>
            <Route exact path='/sightings' component={Sightings}/>
            <Route exact path='/sightings-info' component={SightingsInfo}/>
            <Route exact path='/insert' component={Insert}/>
            <Route component={Login}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

