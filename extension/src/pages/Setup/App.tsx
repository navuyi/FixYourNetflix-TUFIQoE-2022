import React, { useEffect } from 'react';
import {Routes, HashRouter, Route} from "react-router-dom"
import Main from './views/Main/Main';
import Videos from './views/Videos/Videos';

import "./style.module.scss"


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
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;