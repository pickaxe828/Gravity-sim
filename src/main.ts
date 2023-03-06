import p5 from "p5"
import { Entity } from "./utils/entity"

import "./style.css"

let entitys: Entity[] = []
let debug = true

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5

  const width = p.windowWidth
  const height = p.windowHeight

  // Setup
  p.setup = function setup() {
    p.createCanvas(width, height)
    entitys.push(
      Entity.createEntity(p.createVector(width / 2, height / 2 - 200), 20, p.createVector(5, 0), p.createVector(0, 0)),
      Entity.createEntity(p.createVector(width / 2, height / 2), 100, p.createVector(0, 0), p.createVector(0, 0))
    )
    if (debug) {
      console.log(entitys)
    }
  }

  // Main loop
  p.draw = function draw() {
    p.background(200)
    entitys.forEach(entity => { 
      entity.draw(p, debug)
      entity.update(p, entitys)
    })
  }






}, document.getElementById("app")!)