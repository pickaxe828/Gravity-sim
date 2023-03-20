// Import our custom CSS
import './styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import p5 from "p5"
import { Entity } from "./utils/entity"
import { EntityManager } from "./utils/manager"

let debug = true
let debugText = false

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5
  
  let width = document.getElementsByClassName("canva")[0].clientWidth
  let height = p.windowHeight
  
  let canva: p5.Renderer
  
  let entities = EntityManager.createEntityManager(p)

  // Setup
  p.setup = function setup() {
    canva = p.createCanvas(width, height)
    entities.store = [
      Entity.createEntity(p, p.createVector(width / 2, height / 2), 250),
      Entity.createEntity(p, p.createVector(width / 2, height / 2 - 300), 10, p.createVector(2, 0)),
      Entity.createEntity(p, p.createVector(width / 2, height / 2 - 318), 0.25, p.createVector(3, 0)),
      // Entity.createEntity(p, p.createVector(width / 2, height / 2 + 285), 0.25, p.createVector(-2, 0))
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
        entity.drawDebug(p, debug, debugText)
      })
    }
  }

  p.windowResized = function windowResized() {
    width = document.getElementsByClassName("canva")[0].clientWidth
    height = p.windowHeight
    console.log(`Resized to ${width}x${height}`)
    p.resizeCanvas(width, height);
  }
}, document.getElementsByClassName("canva")[0] as HTMLElement)