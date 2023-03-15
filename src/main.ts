import p5 from "p5"
import { Entity } from "./utils/entity"
import { EntityManager } from "./utils/manager"

import "./style.css"

let debug = true

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5
  
  const width = p.windowWidth
  const height = p.windowHeight
  
  let entities = EntityManager.createEntityManager(p)

  // Setup
  p.setup = function setup() {
    p.createCanvas(width, height)
    entities.store = [
      Entity.createEntity(p, p.createVector(width / 2, height / 2), 250),
      Entity.createEntity(p, p.createVector(width / 2, height / 2 - 250), 10, p.createVector(2, 0)),
      Entity.createEntity(p, p.createVector(width / 2, height / 2 - 285), 0.25, p.createVector(2.88, 0))
    ]
  }
  
  // Main loop
  p.draw = function draw() {
    p.background(200)
    // Update
    entities.update()
    // Draw
    entities.draw()
    // Debug
    if (debug) {
      entities.store.forEach(entity => {
        entity.drawDebug(p, debug)
      })
    }
  }
}, document.getElementById("canva")!)