import BaseElement from './baseElement'
import { Loader, Sprite } from 'pixi.js';
interface Option  {
  url:string,
  position?: [number,number]
}
class Image extends BaseElement{
  public url: string
  constructor(option:Option) {
    super(option)
    this.url = option.url
    this.position = option.position || [0, 0]
    this.setup()
  }
  setup() {
    console.log('Image实例化')
  }
  async getImage() {
    const loader = new Loader();
    return new Promise((resolve) => {
      loader.add(this.url).load(() => {
        const img = new Sprite(loader.resources[this.url].texture);
        img.x = this.position[0]
        img.y = this.position[0]
        resolve(img);
      });
    });
  }
}
export { Image }