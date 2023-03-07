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
      Entity.createEntity(p.createVector(width / 2, height / 2), 100, p.createVector(0, 0), p.createVector(0, 0)),
      Entity.createEntity(p.createVector(width / 2, height / 2 - 50), 20, p.createVector(5, 0), p.createVector(0, 0))
    ]
    
  }
  
  // Main loop
  p.draw = function draw() {
    p.background(200)
    entities.calcEntitiesForce()
    entities.drawEntitiesForce()
    entities.store.forEach(entity => {
      entity.draw(p, debug)
      entity.update(p, entities.store)
    })
    if (debug) {
      console.log(entities)
    }
  }






}, document.getElementById("app")!)