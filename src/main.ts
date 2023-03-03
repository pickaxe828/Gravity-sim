import p5 from "p5"

import { Object } from "./utils/class"

import "./style.css"

let objects: Object[] = []
let debug = true

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5

  const width = p.windowWidth
  const height = p.windowHeight

  // Setup
  p.setup = function setup() {
    p.createCanvas(width, height)
    objects.push(
      Object.createObject(p.createVector(width / 2, height / 2 - 200), 20, p.createVector(5, 0), p.createVector(0, 0)),
      Object.createObject(p.createVector(width / 2, height / 2), 100, p.createVector(0, 0), p.createVector(0, 0))
    )
    if (debug) {
      console.log(objects)
    }
  }

  // Main loop
  p.draw = function draw() {
    p.background(200)
    objects.forEach(object => { 
      object.draw(p, debug)
      object.update(p, objects)
    })
  }






}, document.getElementById("app")!)