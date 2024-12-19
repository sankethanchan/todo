//App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo from "./components/Todo";
import './Style.css';

function App() {
  const headStyle = {
    textAlign: "center",
  };
  return (
    <div>
      <div className="headerbg">
        <div className="container">
          <div className="row">
            <div className="col-md-6">        
              <h1> Work Breakdown Tracker </h1>
            </div>
            <div className="col-md-6">
             <p className="text-right"> Sanketh Anchan </p>
            </div>
          </div>
        </div>
       
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
