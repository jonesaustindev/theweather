import React, { Component } from 'react';
import Results from './containers/Results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="App container text-center">
        <h1>TheWeather</h1>
        <Results />
      </div>
    );
  }
}

export default App;
