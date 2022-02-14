import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Signup from './routes/Signup';
import {BrowserRouter, hashHistory, Route, Link, Routes} from "react-router-dom";
import ForgotPassword from "./routes/ForgotPassword";
import RecoverAccount from "./routes/RecoverAccount";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/RecoverAccount" element={<RecoverAccount />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
