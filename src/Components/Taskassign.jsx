import { Space, Table, Tag, Button, Select,message ,Row,Col} from 'antd';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { localUrl } from './Url';
import axios from 'axios';
const { Column, ColumnGroup } = Table;







function Taskassign() {
  const [tableData, setTableData] = useState()
  const [tableoptions, setTableoptions] = useState()
  const [selectedTask, setSelectedTask] = useState()
  const [completedTasks, setCompletedTasks] = useState([])
  // const [ids, setId] = useState()
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


    const taskurl = `${localUrl}/task/notDone`

    
    axios.get(`${localUrl}/task?Done=true`).then((data) => {    
      console.log(data.data.message.tasks, "task")
      const completed = data.data.message.tasks.map((item) => ({
        taskName: item.taskName,
        taskDone: item.taskDone ? "Completed" : "Not Completed",
        assignedTo: item.assignedTo?.username,
        id : item._id
      }));
      console.log(completed);

      setCompletedTasks(completed)
      // console.log(completedTasks,'completed tasks')
    })
    .catch((err) => {
      console.log(err, "err");
    })

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
    // console.log(localStorage.getItem('userId'),'assigned by');
    const body = {
      assignedBy : localStorage.getItem('userId'),
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
      render: (record) => <Button type='primary' onClick={()=>{TaskAssignn(record)}}> Add Task</Button>,
    },
   
  ];

  const columns1 = [
  {
    title: 'Assigned To',
    dataIndex: 'assignedTo',
    key: 'name',
  },
  {
    title: 'Task',
    dataIndex: 'taskName',
    key: 'task',
  },
  {
    title: 'Status',
    dataIndex: 'taskDone',
    render : (text) => <>
       <Tag color="green">{text}</Tag>

    </> ,
    key: 'status',
  },
   {
      title: 'Delete',
      render: (record) => <Button danger={true} type={'primary'} 
      onClick={()=>{deleteTask(record.id)}}> Delete</Button>,
    },
   
];

function deleteTask (id) {
  console.log(id);
  let url = `${localUrl}/task/`
  let body = {
    taskId: id
  }
  axios.delete(url, {data : body}).then((data) => {
    console.log(data);
    message.success(`Task Deleted` );
    
  }).then(() => {
    // reload page after delete
    window.location.reload();
  })
}
  const handleSignup =() => {
    Navigate("/Signup")
  }
  const handleCreateTask =() => {
    Navigate("/Create");
  }
  return (
    <div className='TaskAssign'>
<Row>
<Col span={14} offset={2}>
<h1 >
        Admin Module
      </h1>
</Col>
<Col span={2}  >
<Button className='button' danger  onClick={logout}>
        Logout
      </Button>
</Col>
<Col span={2} >
<Button  className='button' type="primary" ghost onClick={handleSignup} >
            Add user
          </Button>
</Col>
<Col span={2}>

<Button  className='button' type="primary" ghost onClick={handleCreateTask} >
            Create Task
          </Button>
</Col>
      

      
      
</Row>

      
      <Table
       
        columns={columns}
        dataSource={tableData}
      />

      <br/><br/>

    <Col
      span={14} 
      offset={2}
    >
      <Row>
        <h1> Completed Tasks </h1>
      </Row>
    </Col>
      {/* <Row> */}

        <Table dataSource={completedTasks} columns={columns1} />;
      {/* </Row> */}

   

    </div>

    
  )
}

export default Taskassign