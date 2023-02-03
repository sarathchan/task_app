import { Space, Table, Tag, Button, Select,message } from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { localUrl } from './Url';
import axios from 'axios';
const { Column, ColumnGroup } = Table;

function Taskassign() {
  const [tableData, setTableData] = useState()
  const [tableoptions, setTableoptions] = useState()
  const [selectedTask, setSelectedTask] = useState()
  const [ids, setId] = useState()
  const Navigate = useNavigate();

  const logout = () => {
    Navigate("/")
  }
  useEffect(() => {
    const url = `${localUrl}/user/allEmployees`
    axios
      .get(url)
      .then((data) => {
        console.log(data.data.employees)
        let arr = []
        for (let obj of data.data.employees) {
          let object = {
            firstname: obj.username,
            Id: obj._id,
            action:obj._id

          }
          arr.push(object)
          console.log(arr);
          setTableData(arr)
        }
      })


    const taskurl = `${localUrl}/task`

    axios
      .get(taskurl)
      .then((data) => {
        console.log(data.data.message.tasks, "task")
        const options = [];
        for (let obj1 of data.data.message.tasks) {
          options.push({
            label: obj1.taskName.toString(36),
            value: obj1._id.toString(36),
          });
        }
        setTableoptions(options)
      })

  }, [])
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedTask(value)
  };
  const TaskAssignn = (e) => {
    console.log(e, "22");
    const body = {
      assignedTo: e,
      taskId: selectedTask
    }
    console.log(body)
    const url = `${localUrl}/task/assignTask`
    axios
      .post(url, body)
      .then((data) => {
        console.log(data, "77");
        message.success(`Task Updated` );
      })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstname',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'ID',
      dataIndex: 'Id',
    },
    {
      title: 'Tasks Assigned',
      dataIndex: 'Task',
      render:(tags)=>  <>
           <Select
      
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      onChange={handleChange}
      options={tableoptions}
    />
        
      </>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (record) => <Button onClick={()=>{TaskAssignn(record)}}> Add Task</Button>,
    },
   
  ];
  return (
    <div className='TaskAssign'>

      <h1>
        Admin
      </h1>

      <Button className='button' onClick={logout}>
        Logout
      </Button>

      <Table
       
        columns={columns}
        dataSource={tableData}
      />

    </div>
  )
}

export default Taskassign