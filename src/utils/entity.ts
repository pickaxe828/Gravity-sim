import p5 from "p5"
import random from "random"

import { drawArrow } from "./arrow"

const debugArrowScale = 20
const trailSize = 5
const trailLength = 200

let idIncrement = 0

export class Entity {
  constructor(
    public p: p5,
    public id: number,
    public dragging: boolean = false,
    public dragOffset: {x: number, y: number} = {x: 0, y: 0},
    public mass: number,
    public position: p5.Vector,
    public velocity: p5.Vector,
    public forces: p5.Vector[] = [],
    public netForce: p5.Vector = new p5.Vector(),
    public acceleration: p5.Vector = new p5.Vector(),
    public positionHistory: p5.Vector[] = [],
  ) {}

  public static createEntity(p: p5, position: p5.Vector, mass: number, initialVelocity: p5.Vector = new p5.Vector()) {
    return new Entity(p, idIncrement++, false, { x: 0, y: 0 }, mass, position, initialVelocity)
  }
  
  public updateNetForce() {
    this.netForce = this.forces.reduce((a: p5.Vector, b: p5.Vector) => a.copy().add(b))
    // Dont know if this is the right way to implement
  }

  public updateCascadeF2S() {
    // F -> A -> ΔV -> V -> ΔS -> S
    this.acceleration = this.netForce.copy().div(this.mass)
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)
  }

  public updatePositionHistory() {
    this.positionHistory.push(this.position.copy())
  }

  public drawTrail() {
    if (this.positionHistory.length > trailLength) {
      this.positionHistory.shift();
    }
    this.positionHistory.forEach((position: p5.Vector, index: number) => {
      this.p.push()
      this.p.fill(0, 0, 0, index / trailLength * 255)
      this.p.noStroke()
      this.p.ellipse(position.x, position.y, trailSize, trailSize);
      this.p.pop()
    })
  }

  public update() {
    this.dragUpdate()
    this.updateNetForce()
    this.updateCascadeF2S()
    this.updatePositionHistory()
  }

  public draw() {
    this.drawTrail()
    this.p.ellipse(this.position.x, this.position.y, Math.log10(this.mass) * 50, Math.log10(this.mass) * 50)
  }
  
  public dragUpdate() {
    //check if mouse is over the ellipse
    if (this.p.mouseIsPressed && !this.dragging && this.p.dist(this.position.x, this.position.y, this.p.mouseX, this.p.mouseY) < Math.log10(this.mass) * 50 / 2) {
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

  public drawDebug(p: p5, debug: boolean = false, debugText: boolean = false) { 
    if (debug) {
      this.forces.forEach((force: p5.Vector) => {
        drawArrow(p, this.position, force, p.color(100, 100, 100), debugArrowScale)
      })
      drawArrow(p, this.position, this.netForce, p.color(0, 0, 255), debugArrowScale)
      drawArrow(p, this.position, this.acceleration, p.color(255, 0, 0), debugArrowScale)
      drawArrow(p, this.position, this.velocity, p.color(0, 255, 0), debugArrowScale)
    }
    if (debugText) {
      this.p.text(`M: ${this.mass} \nnetF: ${this.netForce.mag().toPrecision(4)} \na: ${this.acceleration.mag().toPrecision(4)} \nv: ${this.velocity.mag().toPrecision(4)} \np: (${this.position.x.toPrecision(4)}, ${this.position.y.toPrecision(4) })`,
      this.position.x + 10, this.position.y + 10)
    }
  }
}
