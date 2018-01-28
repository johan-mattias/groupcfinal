import React, { Component } from 'react'
import './scss/app.css'
import { StatusBar } from './components/StatusBar'

import { Home } from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

export default App;
