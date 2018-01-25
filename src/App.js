import React, { Component } from 'react';
import './scss/app.css'

import { Home } from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <p>This is our init page, main entry point.</p>
        <Home/>
      </div>
    );
  }
}

export default App;
