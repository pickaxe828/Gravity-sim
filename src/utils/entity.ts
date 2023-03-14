import p5 from "p5"
import random from "random"

import { drawArrow } from "./arrow"

const debugArrowScale = 20

let idIncrement = 0

export class Entity {
  constructor(
    public p: p5,
    public id: number,
    public dragging: boolean = false,
    public dragOffset: {x: number, y: number} = {x: 0, y: 0},
    public mass: number,
    public position: p5.Vector = new p5.Vector(),
    public velocity: p5.Vector = new p5.Vector(),
    public acceleration: p5.Vector = new p5.Vector(),
    public forces: p5.Vector[] = [],
    public netForce: p5.Vector = new p5.Vector()
  ) {}

  public static createEntity(p: p5, position: p5.Vector, mass: number, velocity: p5.Vector, acceleration: p5.Vector) {
    return new Entity(p, idIncrement++, false, { x: 0, y: 0 }, mass, position, velocity, acceleration)
  }
  
  public updateNetForce() {
    this.netForce = this.forces.reduce((a: p5.Vector, b: p5.Vector) => a.add(b), new p5.Vector())
    // Dont know if this is the right way to implement inertia?
  }

  public updateCascadeF2S() {
    // F -> A -> ΔV -> V -> ΔS -> S
    console.log(this.netForce.div(this.mass))
    this.acceleration = this.netForce.div(this.mass)
  }

  public update() {
    this.dragUpdate()
    this.updateNetForce()
    this.updateCascadeF2S()
  }

  public draw(p: p5) {
    p.ellipse(this.position.x, this.position.y, this.mass * 1, this.mass * 1)
  }

  public drawDebug(p: p5, debug: boolean = false) { 
    if (debug) {
      // drawArrow(p, this.position, this.velocity, p.color(0, 255, 0), debugArrowScale)
      // drawArrow(p, this.position, this.acceleration, p.color(255, 0, 0), 1000)
      drawArrow(p, this.position, this.netForce, p.color(0, 0, 255), debugArrowScale)
      this.forces.forEach((force: p5.Vector) => {
        drawArrow(p, this.position, force, p.color(0, 0, 0), debugArrowScale)
      })
    }
  }
  
  public dragUpdate() {
  //check if mouse is over the ellipse
    if (this.p.mouseIsPressed && !this.dragging && this.p.dist(this.position.x, this.position.y, this.p.mouseX, this.p.mouseY) < this.mass / 2) {
      this.dragging = true
      this.dragOffset = {
        x: this.position.x - this.p.mouseX,
        y: this.position.y - this.p.mouseY
      }
    } 
    if (!this.p.mouseIsPressed) {
      this.dragging = false
    }
    if (this.dragging) {
      this.position.x = this.p.mouseX + this.dragOffset.x
      this.position.y = this.p.mouseY + this.dragOffset.y
    }
  }
}
