import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './routes/Login';
import Profile from './routes/Profile';
import Signup from './routes/Signup';
import {BrowserRouter, Route, Link, Routes} from "react-router-dom";
import ForgotPassword from "./routes/ForgotPassword";
import RecoverAccount from "./routes/RecoverAccount";
import Timeline from "./routes/Timeline";
import Front from './routes/Front';
import DeleteAccount from "./routes/DeleteAccount";
import CreatePost from "./routes/CreatePost";
import EditProfile from "./routes/EditProfile";
import Code from "./routes/Code";
import Post from "./routes/Post";
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Front />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/RecoverAccount/:id" element={<RecoverAccount />} />
              <Route path="/Profile/:userid" element={<Profile />} />
              <Route path="/Timeline" element={<Timeline />} />
              <Route path="/Front" element={<Front />} />
              <Route path="/DeleteAccount" element={<DeleteAccount />} />
              <Route path="/CreatePost" element={<CreatePost />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/Code" element={<Code />} />
              <Route path="/Post" element={<Post />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
