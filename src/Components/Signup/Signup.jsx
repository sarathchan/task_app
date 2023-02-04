import React, { useState } from "react";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { localUrl } from "../Url";
import { Input, Select, Button, message } from 'antd';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [selectedTask, setSelectedTask] = useState()
    const Navigate = useNavigate();

const HandleSignUp = () => {
    let body ={
        username:email,
        password:Password,
        userType:selectedTask
    }
let SignupUrl = `${localUrl}/user/signup`
axios
.post(SignupUrl,body)
.then((data) => {
    console.log(data,"signupres")
    if (data.status == 200) {
        message.success(`Added user ${data.data.user.userType}`);
        Navigate("/Assign")
      }
      if (data.status == 400) {
        message.error(data.message.error);
      }
})
}
const handleChange = (value) => {
    setSelectedTask(value)
}
 
  return (
    <div>
    <div className='login-Card'>
      <h1>
        Add User
      </h1>
      <Input className='Login-emailinput'
        placeholder="Username"
        onChange={(e) => { setEmail(e.target.value) }} />
      <Input
        className='Login-passinput'
        placeholder="Password"
        onChange={(e) => { setPassword(e.target.value) }}
        type="password" />
        <Select
        onChange={handleChange}
        placeholder="Select UserType"
        style={{
            width: '60%',
          }}
        options={[
        {
          value: 'admin',
          label: 'Admin',
        },
        {
            value: 'employee',
            label: 'Employee', 
        }
      ]}
      >
        </Select>

      <div className='Login-Button'>

        <Button
          onClick={HandleSignUp}>
          Add User
        </Button>
        
      </div>
    </div>
  </div>
  )
}

export default Signup