let fish = []
let bubbles = []
let palette = ["#61a0af", "#96c9dc", "#ff7aa9", "#ffbd61", "#f5d491"]

function setup() {
  createCanvas(600, 600)
  for (let i = 0; i < 14; i++) {
    fish.push(makeFish(random(width), random(height)))
  } // for
}

function makeFish(x, y) {
  return {
    x: x,
    y: y,
    size: random(40, 80),
    seed: random(1000),    // its own place in the noise landscape
    t: 0,                  // its own noise "time"
    life: random(900, 1800),
    c: random(palette)
  }
}

function draw() {
  background('#50bbd3')
  
  // bubbles
  // 1. Periodically spawn a new bubble at the bottom
  if (random(1) < 0.05) { // 10% chance every frame
    bubbles.push(new Bubble());
  }

  // 2. Loop through bubbles backwards to safely update, show, and remove them
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
    bubbles[i].display();

    // Remove the bubble if it floats past the top of the canvas
    if (bubbles[i].isOffScreen()) {
      bubbles.splice(i, 1); 
    }
  }
  
  // a new fish now and then, so the room never empties
  if (frameCount % 120 === 0 && fish.length < 10) {
    fish.push(makeFish(random(width), random(height)))
  }

  for (let i = fish.length - 1; i >= 0; i--) {
    let c = fish[i]
    let d = dist(c.x, c.y, mouseX, mouseY)
    let scared = d < 120

    // 1. wander: noise picks a speed in x and in y
    c.x += map(noise(c.seed, c.t), 0, 1, -2, 2)
    c.y += map(noise(c.seed + 500, c.t), 0, 1, -2, 2)

    // 2. run away from the mouse
    if (scared) {
      let away = atan2(c.y - mouseY, c.x - mouseX)
      c.x += cos(away) * 4
      c.y += sin(away) * 4
    }
    c.x = constrain(c.x, 0, width)
    c.y = constrain(c.y, 0, height)

    // 3. mood: a scared creature moves through noise faster, so it wobbles more
    if (scared) {
      c.t += 0.08
    } else {
      c.t += 0.01
    }

    c.life -= 1
    drawFish(c, scared)

    if (c.life <= 0) {
      fish.splice(i, 1)
    }
  }
}

// 3. Define the Bubble class
class Bubble {
  constructor() {
    this.x = random(width);          // Random horizontal position
    this.y = height + random(20, 50); // Start just below the bottom edge
    this.r = random(10, 40);         // Random radius size
    this.speed = random(1, 4);       // Speed of rising upward
  }

  move() {
    this.y -= this.speed;            // Move upward
    this.x += random(-2, 2);         // Add a gentle side-to-side wiggle effect
  }

  display() {
    stroke(255, 150);                // White outline with some transparency
    strokeWeight(3);
    fill(255, 50);                   // Semi-transparent white fill for a glassy look
    ellipse(this.x, this.y, this.r * 2);
    
    // Optional: Add a little highlight reflection on the bubble
    noStroke();
    fill(255, 180);
    ellipse(this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.3);
  }

  isOffScreen() {
    return (this.y < -this.r * 2);   // True if the bubble is completely past the top
  }
}

function drawFish(c, scared) {
  let asleep = c.life < 180
  let alphaValue = 255
  if (asleep) {
    alphaValue = map(c.life, 0, 180, 0, 255)   // fade out while sleeping
  }

  push()
  translate(c.x, c.y)
  // rect(0, 0, 200, 100)
  strokeWeight(3)
  let tailColor = color(c.c)
  let tailStrokeColor = color(20, 22, 31)
  tailColor.setAlpha(alphaValue)
  // fill(tailColor)
  fill(tailColor)
  stroke(20, 22, 31, alphaValue)

  triangle(10,0, 50, -30, 50, 30)
  
  // // sin wave tail
  // beginShape()
  // noFill()
  // strokeWeight(3)
  // for(let i = 0; i < 70; i+=5) {
  //   // let vy = map(sin(i ), 0,1 , 0, 20)
  //   let vy = 10 * sin(i * 0.1 + frameCount * 0.1) ;
  //   vertex(i, vy )
  // }
  // endShape()
  
  // body: a circle whose edge is pushed in and out by 2D noise
  let col = color(c.c)
  col.setAlpha(alphaValue)
  fill(col)
  stroke(20, 22, 31, alphaValue)
  strokeWeight(3)
  beginShape()
  for (let a = 0; a < TWO_PI; a += 0.2) {
    let n = noise(c.seed + cos(a) + 1, c.seed + sin(a) + 1, c.t)
    let r = c.size / 2 * map(n, 0, 1, 0.7, 1.3)
    vertex(cos(a) * r, sin(a) * r)
  }
  endShape(CLOSE)

  // eyes
  let e = c.size * 0.18
  if (asleep) {
    // closed eyes
    line(-e * 1.6, -e * 0.3, -e * 0.6, -e * 0.3)
  } else {
    let look = atan2(mouseY - c.y, mouseX - c.x)   // where the mouse is
    for (let side = -1; side < 1; side += 2) {
      let ex = side * e * 1.1
      fill(255, alphaValue)
      strokeWeight(2)
      circle(ex, -e * 0.3, e * 1.6)
      noStroke()
      fill(20, 22, 31, alphaValue)
      circle(ex + cos(look) * e * 0.35, -e * 0.3 + sin(look) * e * 0.35, e * 0.7)
      stroke(20, 22, 31, alphaValue)
    }
  }

  // blush when scared
  if (scared && !asleep) {
    noStroke()
    fill(255, 120, 150, 180)
    ellipse(-e * 1, e * 0.9, e * 1.2, e * 0.6)
  }
  pop()
}

// click to hatch a new creature at the mouse
function mousePressed() {
  fish.push(makeFish(mouseX, mouseY))
}