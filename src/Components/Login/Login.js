import React, { useState } from "react";
import './Login.css';
import { Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState()
  const [Password, setPassword] = useState()

  const HandleLogin = () => {
    let body = {
      username: email,
      password: Password
    };
    let url = "http://localhost:3000/user/login"
    axios
      .post(url, body)
      .then((data) => {
        console.log(data.data, "====")
        window.localStorage.setItem("userId", JSON.stringify(data.data.user._id));
        window.localStorage.setItem("name", JSON.stringify(data.data.user.username));
        if (data.data.user.userType == "admin") {

          Navigate("/Assign")
        }
        if (data.data.user.userType == "employee") {
          Navigate("/View")
        }
        if (data.status == 200) {
          message.success(`Logged in as ${data.data.user.userType}`);

        }
        if (data.status == 400) {
          message.error(data.message.error);
        }
      })


  }
 
  return (
    <div>
      <div className='login-Card'>
        <h1>
          Login
        </h1>
        <Input className='Login-emailinput'
          placeholder="Username"
          onChange={(e) => { setEmail(e.target.value) }} />
        <Input
          className='Login-passinput'
          placeholder="Password"
          onChange={(e) => { setPassword(e.target.value) }}
          type="password" />

        <div className='Login-Button'>

          <Button
            onClick={HandleLogin}>
            Login
          </Button>
          
        </div>
      </div>
    </div>
  )
}

export default Login