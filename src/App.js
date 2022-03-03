import './App.scss';
import React from 'react';
import { Form, Input, Button } from 'antd'
const submit = function(e){
  console.log('submit',formRef)
}
const formRef = React.createRef();

function App() {
  return (
    <div className="App">
      <h2 className='title'>密集架线图生成工具</h2>
      <Form ref={formRef}>
      <Form.Item label="长度">
        <Input placeholder="请输入房间长度" />
      </Form.Item>
      <Form.Item label="宽度">
        <Input placeholder="请输入房间宽度" />
      </Form.Item>
      <Form.Item label="行">
        <Input placeholder="请输入密集架行数" />
      </Form.Item>
      <Form.Item label="列">
        <Input placeholder="请输入密集架列数" />
      </Form.Item>
      <Form.Item label="轨道条数">
        <Input placeholder="请输入轨道条数" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={ submit }>生成</Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default App;
