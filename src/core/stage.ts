import { Application } from 'pixi.js';
import { Image } from './graphical/image';
class Stage {
  public option: any;
  public app: any;
  public eventsMap: any = new Map();
  public childrens: any = [];
  constructor(option: any) {
    this.option = option;

    this.setup();
  }
  // 初始化
  public setup() {
    this.app = new Application({
      width: this.option.container.clientWidth,
      height: this.option.container.clientHeight,
      transparent: this.option.background ? false : true,
    });
    this.option.container.appendChild(this.app.view);
    if (this.option.background) {
      this.app.renderer.backgroundColor = this.option.background;
    }
    this.app.renderer.autoResize = true;
    this.app.stage.interactive = true;
    this.registerEvent();
  }
  // 事件注册
  private registerEvent() {
    window.onresize = () => {
      this.app.renderer.resize(
        this.option.container.clientWidth,
        this.option.container.clientHeight
      );
    };
  }

  public on(key: string, callback: Function) {
    this.eventsMap.set(key, callback);
    // 监听事件
    this.app.stage.on(key, callback);
  }

  // 添加图片
  public addImage(url: string) {
    const img = new Image({
      url,
    });
    console.log('img', img);
    return new Promise(async (resolve) => {
      let pic = await img.getImage();
      this.app.stage.addChild(pic);
      resolve(pic);
    });
  }

  // 添加图形
  public drawCabinet() {}

  // 清空
  public clear() {
    this.app.stage.removeChildren()
  }

  // 销毁
  public destroy() {
    this.app.stage.removeChildren()
    this.app.destroy(true);
    this.app = null
  }

  get name() {
    return 'Stage';
  }
}
export { Stage };
