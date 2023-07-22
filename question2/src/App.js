import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AllTrains from './pages/AllTrains';
import {
  BrowserRouter,
  Route,Routes
} from "react-router-dom";
import SingleTrain from './pages/SingleTrain';

function App() {

  const login = async () => {
      const result = await axios.post('http://20.244.56.144/train/auth', {
        "companyName": process.env.REACT_APP_COMPANYNAME,
        "clientID": process.env.REACT_APP_CLIENTID,
        "ownerName":process.env.REACT_APP_OWNERNAME,
        "ownerEmail":process.env.REACT_APP_OWNEREMAIL,
        "rollNo":process.env.REACT_APP_ROLLNO,
        "clientSecret":process.env.REACT_APP_CLIENTSECRET
      });

      localStorage.setItem('token', result.data.access_token );
  } 

  useEffect(() => {
    login();
  }, [])
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllTrains/>} />
        <Route path = "/:id" element = { <SingleTrain/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
