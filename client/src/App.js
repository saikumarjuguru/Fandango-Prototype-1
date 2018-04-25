import React, { Component } from 'react';
import NewerHomePage from "./components/NewerHomePage";
import {BrowserRouter} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'


class App extends Component {

  state = {
    response: ''
  };

  render() {
    return (
      <div>
          <BrowserRouter>
            <NewerHomePage/>
          </BrowserRouter>


       </div>
    );
  }
}

export default App;
