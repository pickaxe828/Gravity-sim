import p5 from "p5"
import random from "random"

import { drawArrow } from "./arrow"

const debugArrowScale = 20

let idIncrement = 0

export class Entity {
  constructor(
    public id: number,
    public mass: number,
    public position: p5.Vector = new p5.Vector(),
    public velocity: p5.Vector = new p5.Vector(),
    public acceleration: p5.Vector = new p5.Vector(),
    public forces: p5.Vector[] = [],
    public netForce: p5.Vector = new p5.Vector()
  ) {}

  public static createEntity(position: p5.Vector, mass: number, velocity: p5.Vector, acceleration: p5.Vector) {
    return new Entity(idIncrement++, mass, position, velocity, acceleration)
  }

  public updateNetForce() {
    this.netForce = this.forces.reduce((a: p5.Vector, b: p5.Vector) => a.add(b), new p5.Vector())
  }

  public updateCascadeF2S(p: p5) {
    // F -> A -> ΔV -> V -> ΔS -> S
    this.acceleration = this.netForce.div(this.mass)
  }

  public draw(p: p5) {
    p.ellipse(this.position.x, this.position.y, this.mass * 1, this.mass * 1)
  }

  public drawDebug(p: p5, debug: boolean = false) { 
    if (debug) {
      // drawArrow(p, this.position, this.velocity, p.color(0, 255, 0), debugArrowScale)
      drawArrow(p, this.position, this.acceleration, p.color(255, 0, 0), debugArrowScale)
      drawArrow(p, this.position, this.netForce, p.color(0, 0, 255), debugArrowScale)
      this.forces.forEach((force: p5.Vector) => {
        console.log([this.position, force])
        drawArrow(p, this.position, force, p.color(0, 0, 0), debugArrowScale)
      })
    }
  }
  
}
