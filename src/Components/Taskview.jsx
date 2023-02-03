import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Row } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { localUrl } from './Url';


function Taskview() {
  const Navigate = useNavigate();
  const [tableData, setTableData] = useState()
  const [disabled, setDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("Mark As Read")

  const logout = () => {
    Navigate("/")
  }
  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem('userId'));
    const name = JSON.parse(window.localStorage.getItem('name'));
    const url = `${localUrl}/task/viewTask`
    const body = {
      userId: userId
    }
    axios
      .post(url, body)
      .then((data) => {
        console.log(data.data.message, "channnn")
        let arr = []
        for (let obj of data.data.message.tasks) {
          let object = {
            name: name,
            Id: obj.assignedTo,
            Task: obj.taskName,
            status: obj.taskName,
            disabled: false,

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
  const handleClick = ( Row,e) => {
    console.log("hello", e, Row);
    console.log(typeof tableData,"tableData");
    const src = tableData.find(src => src.Task=== Row.Task);
    console.log(src,"src");
    src.disabled = true
    setTableData(tableData)
    // setButtonText("done")
    // setDisabled(Row.disabled)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      render: (tags) => <>
        <Tag color="blue" key={tags}>
          {tags}
        </Tag>

      </>
    },
    {
      title: 'Tasks Assigned',
      dataIndex: 'Task',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (Row,record) =>
      {
console.log(Row.disabled,"Row")
        return <Button 
          type='primary'
          disabled={Row.disabled}
          onClick={() => { handleClick(record, Row) }}> {buttonText}</Button>
      }


    }

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

export default Taskview