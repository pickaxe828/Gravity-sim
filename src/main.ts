import p5 from "p5"

import { Object } from "./utils/class"

import "./style.css"

let objects: Object[] = []

const _app = new p5(p5Instance => {
  const p = p5Instance as unknown as p5

  const height = 500
  const width = 500

  // Setup
  p.setup = function setup() {
    p.createCanvas(height, width)
    p.background(200)

    objects.push(
      Object.createObject(p.createVector(100, 100), 1, p.createVector(0, 0), p.createVector(0, 0)),
      Object.createObject(p.createVector(width / 2, height / 2), 20, p.createVector(0, 0), p.createVector(0, 0))
    )
  }

  // Main loop
  p.draw = function draw() {
    for (let i of objects) {
      i.draw(p, true)
    }
  }






}, document.getElementById("app")!)