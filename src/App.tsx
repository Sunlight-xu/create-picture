import { createRef, Component } from 'react';
import { Button, Form, Input } from 'antd';
import { Stage } from './core/stage';
import config from './config'
import './App.scss'
class App extends Component {
  state: any;
  stage: any;
  container: any;
  constructor(props: any) {
    super(props);
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 14,
        },
      },
    };
    this.state = {
      title: config.title,
      formRef: createRef(),
      formItemLayout: formItemLayout
    };
    this.container = createRef();
    this.stage = null
  }
  async componentDidMount() {
    this.init();
    this.initPixiStage();
  }
  async init() {
    // console.log(this.stage.current);
  }
  // 清空画布
  clearStage() {
    this.stage.clear()
  }
  async submit() {
    let data = {
      long: Number(this.state.formRef.current.getFieldValue('long')),
      wide: Number(this.state.formRef.current.getFieldValue('wide')),
      rows: Number(this.state.formRef.current.getFieldValue('rows')),
      columns: Number(this.state.formRef.current.getFieldValue('columns')),
      track: Number(this.state.formRef.current.getFieldValue('track')),
    }
    console.log(this.stage, data)
    const pic:any = await this.stage.addImage('https://prod-deployment.oss-cn-hangzhou.aliyuncs.com/3bc5d62bf7ee42758d0b72095e3ad70a_logo%285%29.jpg')
    console.log(pic)
  }
  // 
  async initPixiStage() {
    let container = this.container.current;
    this.stage = new Stage({
      container,
      // background: 0xff0000
    });
    console.log('stage', this.stage)
    // const pic:any = await stage.addImage('https://prod-deployment.oss-cn-hangzhou.aliyuncs.com/3bc5d62bf7ee42758d0b72095e3ad70a_logo%285%29.jpg')
    // pic.x = 300;
    // pic.y = 300;
    // 动画帧
    // stage.app.ticker.add(()=>{
    //   pic.rotation += Math.PI / 180;
    // })
    // pic.rotation = Math.PI / 2 / 2;
    // pic.scale.set(1, 1); // 缩放
    // pic.anchor.set(1, 1); // 锚点
    // pic.pivot.set(pic.width/2, pic.height/2) // 自转中心点
  }
  render() {
    return <div className='App'>
        <h2 className='title'>{this.state.title}</h2>
        <Form ref={this.state.formRef} {...this.state.formItemLayout}>
          <Form.Item name="long" label="长度">
            <Input placeholder="请输入房间长度" />
          </Form.Item>
          <Form.Item name="wide" label="宽度">
            <Input placeholder="请输入房间宽度" />
          </Form.Item>
          <Form.Item name="rows" label="行">
            <Input placeholder="请输入密集架行数" />
          </Form.Item>
          <Form.Item name="columns" label="列">
            <Input placeholder="请输入密集架列数" />
          </Form.Item>
          <Form.Item name="track" label="轨道条数">
            <Input placeholder="请输入轨道条数" />
          </Form.Item>
        </Form>
        <Button className='button' block type="primary" onClick={ this.submit.bind(this) }>生成</Button>
        <Button className='button' block type="primary" onClick={ this.clearStage.bind(this) }>清空</Button>
      <div className="stage" ref={this.container}></div>
    </div>
  }
}
export default App;
