import React, { useState,useEffect } from 'react';
import { Table,Button,Tag} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';


function Taskview() {
    const Navigate = useNavigate();
    const[tableData,setTableData] =useState()

    const logout =() =>{
        Navigate("/")
    }
    useEffect(() => { 
      const userId = JSON.parse(window.localStorage.getItem('userId'));
      const name = JSON.parse(window.localStorage.getItem('name'));
      const url ="http://localhost:3000/task/viewTask"
      const body={
        userId:userId
      }
      axios
      .post(url,body)
      .then((data) => {
        console.log(data.data.message,"channnn")
        let arr =[]
    for(let obj of data.data.message.tasks){
    let object = {
      name:name,
      Id:obj.assignedTo,
      Task:obj.taskName
      
    }
    arr.push(object)
    console.log(arr);
    setTableData(arr)
    }
      })
    
    
      
      
    }, [])
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
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
            <Tag color="blue" key={tags}>
              {tags}
            </Tag>
          
        </>
      },
     
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    const name = JSON.parse(window.localStorage.getItem('name'));
      
  return (
    <div className='Taskview'>
<h1>
    Task View page
</h1>
<p>
  hello {name}
</p>
<Button className='button'onClick={logout}>
    Logout
  </Button>
  <Table
       
        columns={columns}
        dataSource={tableData}
      />
    </div>
  )
}

export default Taskview