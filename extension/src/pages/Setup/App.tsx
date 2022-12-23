import React, { useEffect } from 'react';
import {Routes, HashRouter, Route} from "react-router-dom"
import Main from './views/Main/Main';
import Videos from './views/Videos/Videos';

import "./style.module.scss"
import About from './views/About/About';


const App = () => {
  

  return (
    <>
      <HashRouter>
        <Routes>
          <Route 
            path="/"
            element={<Main />}
          />
          <Route 
            path="/videos"
            element={<Videos />}
          />
          <Route 
            path="/about"
            element={<About />}
          />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;