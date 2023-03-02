import p5 from "p5"
import random from "random"

import { drawArrow } from "./arrow"

export class Object {
  constructor(
    public id: number,
    public mass: number,
    public position: p5.Vector = new p5.Vector(),
    public velocity: p5.Vector = new p5.Vector(),
    public acceleration: p5.Vector = new p5.Vector()
  ) {
    this.id = id;
    this.position = position;
    this.mass = mass;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  public static createObject(position: p5.Vector, mass: number, velocity: p5.Vector, acceleration: p5.Vector) {
    return new Object(random.int(0, 0xFFFFFF), mass, position, velocity, acceleration);
  }

  public draw(p: p5, debug: boolean = false) {
    p.ellipse(this.position.x, this.position.y, this.mass * 10, this.mass * 10);
    if (debug) {
      drawArrow(p, this.position, this.velocity, p.color(255, 0, 0));
      drawArrow(p, this.position, this.acceleration, p.color(0, 255, 0));
    }
  }
}
