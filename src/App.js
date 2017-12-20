import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BIED Youth Survey</h1>
        </header>
        <p className="App-intro">
          To get started, Register as surveyor
        </p>
        <form>
          <label>
            Your name:
            <input type="text" name="firstname" style={{width: 200}}/>

          </label>
          <br/>
          <label>
            Email address:
            <input type="text" name="email" style={{width: 200}}/>
          </label>
          <br/>
          <input type="submit"/>
        </form>
        <div>
          <p>
            Your Name and Email Address will not be used with research data collected
          </p>
        </div>
      </div>

    );
  }
}

export default App;
