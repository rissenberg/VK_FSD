import React from 'react';
import './style/index.scss';
import {MainPage} from "../pages/LandingPage";
import {QueryProvider} from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <div className="App">
        <MainPage/>
      </div>
    </QueryProvider>
  );
}

export default App;
