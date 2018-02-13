import React, { Component } from 'react'
import './scss/app.css'
import {Insert} from './components/Insert'

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
