import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { localUrl } from './Url';

function Taskview() {
  const Navigate = useNavigate();
  const [tableData, setTableData] = useState()
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
        console.log(data.data, "channnn")
        let arr = []
        for (let obj of data.data.message.tasks) {
          let object = {
            name: name,
            Id: obj._id,
            Task: obj.taskName,
            status: obj.taskName,
            disabled: obj.taskDone,

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
  const handleClick = (Row, e) => {
    // console.log("hello", e, Row);
    const src = tableData.find(src => src.Id === Row.Id);
    // console.log(src,"src");
    src.disabled = true
    setTableData([...tableData])
    console.log(tableData);
    let DisableUrl = `${localUrl}/task/taskDone`
    let body = {
      taskId: Row.Id
    }
    axios
      .post(DisableUrl, body)
      .then((res) => {
        console.log(res, "disable");
      })

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
      render: (Row, record) => {
        console.log(Row);
        return <Button
          type='primary'
          disabled={record.disabled}
          onClick={() => { handleClick(record, Row) }}> {buttonText}</Button>
      }


    }

  ];

  const name = JSON.parse(window.localStorage.getItem('name'));

  return (
    <div className='Taskview'>

      <Row>
        <Col span={18} offset={2}>
          <h1>
            Task View page
          </h1>
        </Col>
        <Col span={2}>
          <Button className='button' danger onClick={logout}>
            Logout
          </Button>
        </Col>




      </Row>
      <Col offset={2}>
        <p>
          hello {name}
        </p>

      </Col>

      <Table

        columns={columns}
        dataSource={tableData}
      />
    </div>
  )
}

export default Taskview