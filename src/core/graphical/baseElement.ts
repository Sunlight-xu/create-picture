interface Option {
  url?: string;
  property?: object;
  position?: [number, number];
}
class BaseElement {
  public property: {};
  public position: [number, number];
  constructor(option: Option) {
    this.property = option.property || {};
    this.position = option.position || [100, 100];
  }
  setPosition(position: [number, number]) {
    this.position = position;
  }
  getProperty() {
    return this.property;
  }
  getPosition() {
    return this.position;
  }
}
export default BaseElement;
