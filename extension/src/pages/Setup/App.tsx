import React, { useEffect } from 'react';
import {Routes, HashRouter, Route} from "react-router-dom"
import Main from './views/Main/Main';

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
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;