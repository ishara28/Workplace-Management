import React from "react";
import "./App.css";
import Welcome from './components/Welcome';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/*<Main/>*/}
        <Welcome/>
      </div>
    </BrowserRouter>
  );
}

export default App;
