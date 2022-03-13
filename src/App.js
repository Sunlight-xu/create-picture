import './App.scss';
import React, { Component } from 'react';
import { Form, Input, Button } from 'antd'
import * as THREE from 'three'
class App extends Component {
  constructor() {
    super();
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
      formRef: React.createRef(),
      canvas: React.createRef(),
      formItemLayout: formItemLayout
    }
  }
  init() {
    let scene = new THREE.Scene();

    // 创建一个相机，定义我们能看到的位置。
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // 创建渲染并设置大小和阴影。
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xFFFFFF));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    /** 创建立方体 */
    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
    let cubeMaterial = new THREE.MeshLambertMaterial({
      color: 0xFF0000
    });
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    /** 定义立方体的位置 */
    cube.position.x = -4;
    cube.position.y = 2;
    cube.position.z = 0;
    /** 定义球体 */
    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0x7777ff
    })
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    /** 定义球体的位置 */
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;

    /** 定义地平面 */
    let planeGeometry = new THREE.PlaneGeometry(60, 20);
    let planeMaterial = new THREE.MeshLambertMaterial({
      color: 0xAAAAAA
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    console.log(plane)

    /** 旋转定位地平面的位置 */
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    plane.receiveShadow = true;

    /** 将物体添加到场景中 */
    scene.add(cube);
    scene.add(sphere);
    scene.add(plane);

    /** 摆放相机的位置 */
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    /** 为阴影添加聚光灯 */
    let spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 40, -15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.near = 40;

    /** 
     * 如果你想要更详细的阴影，你可以增加用于绘制阴影的mapSize
     * spotLight.shadow.mapSize = new THREE.Vector2(1024,1024)
     */

    scene.add(spotLight);

    let ambienLight = new THREE.AmbientLight(0x353535);
    scene.add(ambienLight);
    document.getElementById("canvas").appendChild(renderer.domElement);
    /** 调用渲染功能 */
    renderer.render(scene, camera)
  }
  submit() {
    let data = {
      long: Number(this.state.formRef.current.getFieldValue('long')),
      wide: Number(this.state.formRef.current.getFieldValue('wide')),
      rows: Number(this.state.formRef.current.getFieldValue('rows')),
      columns: Number(this.state.formRef.current.getFieldValue('columns')),
      track: Number(this.state.formRef.current.getFieldValue('track')),
    }
    console.log(data)
    console.log(this.scene)
  }
  componentDidMount(){
    console.log('canvas',this.state.canvas.current)
    this.init()
  }
  render() {
    return (
      <div className="App">
        <div>{ this.state.scene }</div>
        <h2 className='title'>密集架线图生成工具</h2>
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
        <div className='canvas' id="canvas" ref={ this.state.canvas }></div>
      </div>
    );
  }
}

export default App;
