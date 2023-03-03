import p5 from "p5"

export function drawArrow(p: p5, base: p5.Vector, vec: p5.Vector, color: p5.Color = p.color(0, 0, 0), scale: number = 1) {
    vec = vec.copy().mult(scale);
    p.push();
    p.stroke(color);
    p.strokeWeight(3);
    p.fill(color);
    p.translate(base.x, base.y);
    p.line(0, 0, vec.x, vec.y);
    p.rotate(vec.heading());
    let arrowSize = 7;
    p.translate(vec.mag() - arrowSize, 0);
    p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    p.pop();
}