import React, { useState } from "react";
// import './Login.css';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import { Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { localUrl } from "./Url";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState()
  const [taskName,setTaskName] = useState();
  const [messageApi, contextHolder] = message.useMessage();


  const HandleCreate = () => {
    let body = {
     taskName 
    };
    // let url = "http://localhost:3000/task"
    let url =  `${localUrl}/task`

    axios
    .post(url, body)
    .then((data) => {
    //   console.log(data.data, "====")
    //   window.localStorage.setItem("userId", JSON.stringify(data.data.user._id));
    //   window.localStorage.setItem("name", JSON.stringify(data.data.user.username));
    //   if (data.data.user.userType == "admin") {
        
    //     Navigate("/Assign")
    //   }
    //   if (data.data.user.userType == "employee") {
    //     Navigate("/View")
    //   }
      if (data.status == 200) {
        message.success(`Task added successfully`);
        Navigate('/Assign')
      }

    //   if (data.status == 400) {
    //     message.error(data.message.error);
    //   }
    })
    .catch((errRes) => {
      console.log(errRes.response.data)
      
      messageApi.error(errRes.response.data.message.error);

      })


  }
 
  return (
    <>
    {contextHolder}
    <div>
      <div className='login-Card'>
        <h1>
          Create Task
        </h1>
        <Input 
        className='Login-emailinput'
          placeholder="Task Name"
          onChange={(e) => { setTaskName(e.target.value) }} />
          

        <div className='Login-Button'>

          <Button
            onClick={HandleCreate}>
            Create
          </Button>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default Login