import React, { useState } from "react";
import './Login.css';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import { Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { localUrl } from "../Url";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState()
  const [Password, setPassword] = useState()
  const [messageApi, contextHolder] = message.useMessage();
  const [resMessage,setMessage] = useState('');


  const HandleLogin = () => {
    let body = {
      username: email,
      password: Password
    };
    // let url = "http://localhost:3000/user/login"
    let url =  `${localUrl}/user/login`

    axios
    .post(url, body)
    .then((data) => {
      console.log(data.data, "====")
      window.localStorage.setItem("userId", JSON.stringify(data.data.user._id).replace(/"/g,''));
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
    .catch((errRes) => {
      // console.log(errRes.response.data)
      messageApi.error(errRes.response.data.message.error);

      })


  }
 
  return (
    <>
    {contextHolder}
    <div>
      <div className='login-Card'>
        <h1>
          Login
        </h1>
        <Input 
        prefix={<UserOutlined />}className='Login-emailinput'
          placeholder="Username"
          onChange={(e) => { setEmail(e.target.value) }} />
        <Input
        prefix={<LockOutlined />}
          className='Login-passinput'
          placeholder="Password"
          onChange={(e) => { setPassword(e.target.value) }}
          type="password" 
         
         />
          

        <div className='Login-Button'>

          <Button
            onClick={HandleLogin}>
            Login
          </Button>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default Login