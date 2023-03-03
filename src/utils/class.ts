import p5 from "p5"
import random from "random"

import { drawArrow } from "./arrow"

const debugArrowScale = 20

let idIncrement = 0

export class Object {
  constructor(
    public id: number,
    public mass: number,
    public position: p5.Vector = new p5.Vector(),
    public velocity: p5.Vector = new p5.Vector(),
    public acceleration: p5.Vector = new p5.Vector(),
    public forces: p5.Vector[] = [],
    public netForce: p5.Vector = new p5.Vector()
  ) {
    this.id = id
    this.position = position
    this.mass = mass
    this.velocity = velocity
    this.acceleration = acceleration
  }

  public static createObject(position: p5.Vector, mass: number, velocity: p5.Vector, acceleration: p5.Vector) {
    return new Object(idIncrement++, mass, position, velocity, acceleration)
  }

  public update(p: p5, objectList: Object[]) {
    this.forces = []
    this.netForce = new p5.Vector()
    objectList.forEach(object => {
      if (object.id !== this.id) {
        const distance = p5.Vector.sub(object.position, this.position)
        // f = G * m1 * m2 / r^2
        const forceMag = (object.mass * this.mass) / (distance.magSq())
        const force = new p5.Vector()
        this.forces.push(force)
      }
      this.forces.forEach(force => {
        this.netForce.add(force)
      })
    })
  }

  public draw(p: p5, debug: boolean = false) {
    p.ellipse(this.position.x, this.position.y, this.mass * 1, this.mass * 1)
    if (debug) {
      drawArrow(p, this.position, this.velocity, p.color(0, 255, 0), debugArrowScale)
      drawArrow(p, this.position, this.acceleration, p.color(255, 0, 0), debugArrowScale)
      drawArrow(p, this.position, this.netForce, p.color(0, 0, 255), debugArrowScale * 1000)
    }
  }
  
}
