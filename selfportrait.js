let x1, x2, x3, x4;
let y1, y2, y3, y4;
let a1, a2, a3, a4;
let b1, b2, b3, b4;
let tx, ty;
let canvas = 400

function setup() {
  createCanvas(canvas, canvas);

  tx = 0;
  ty = 0;
}

function draw() {
  background(153, 222, 246);

  fill(162, 202, 122)
  noStroke()
  rect(0, canvas * .6, canvas, canvas * .4)
  // grass
  
  
  // body behind
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  circle(canvas * .9, canvas * .8, canvas * .2,)

  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  circle(canvas * .75, canvas * .75, canvas * .28,)
  
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  circle(canvas * .6, canvas * .7, canvas * .3,)
  
  // ---- body
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  ellipse(x1, y1, 110)
  x1 = 200
  y1 = 320
  a1 = (mouseX - x1) / 30
  b1 = (mouseY - y1) / 30
  x1 = x1 + a1;
  y1 = y1 + b1;

  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  ellipse(x2, y2, 100)
  x2 = 200
  y2 = 280
  a2 = (mouseX - x2) / 8
  b2 = (mouseY - y2) / 8
  x2 = x2 + a2;
  y2 = y2 + b2;

  // antenna
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  rect(x3 - 45, y3 - 80, 10, 100,)
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  ellipse(x3 - 40, y3 - 90, 20, 20,)
  
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  rect(x3 + 35, y3 - 80, 10, 100,)
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  ellipse(x3 + 40, y3 - 90, 20, 20,)
  
  // head
  stroke(52, 87, 80)
  strokeWeight(4)
  fill (118, 166, 105)
  ellipse(x3, y3, 110)

  // pupil movement
  x4 = x3
  y4 = y3;
  a4 = (mouseX - x4) / 20
  b4 = (mouseY - y4) / 20
  x4 = x4 + a4;
  y4 = y4 + b4;
  
  //eye L
  stroke(52, 87, 80)
  strokeWeight(4)
  fill(255)
  ellipse(x3 - 30, y3 + 10, 30)
  // ----- pupil
  strokeWeight(0)
  fill(0)
  ellipse(x4 - 30, y4 + 10, 20)

  // eye R
  stroke(52, 87, 80)
  strokeWeight(4)
  fill(255)
  ellipse(x3 + 30, y3 + 10, 30)
  // ----- pupil
  strokeWeight(0)
  fill(0)
  ellipse(x4 + 30, y4 + 10, 20)

  // mouth
  stroke(145, 76, 114)
  strokeWeight(4)
  fill(213, 96, 128)
  ellipse(x3, y3 + 40, 10, 2)
  
  // open mouth when close
  if(mouseX > x3 - 50 && 
    mouseX < x3 + 50 &&
    mouseY < y3 + 50 &&
    mouseY > y3 - 50) {
    // mouth
    stroke(145, 76, 114)
    strokeWeight(4)
    fill(213, 96, 128)
    ellipse(x3, y3 + 40, 30, 20)

    // on click munch
    if (mouseIsPressed) {
      //eye L
      stroke(52, 87, 80)
      strokeWeight(4)
      fill(118, 166, 105)
      ellipse(x3 - 30, y3 + 10, 30)
      // eye R
      stroke(52, 87, 80)
      strokeWeight(4)
      fill(118, 166, 105)
      ellipse(x3 + 30, y3 + 10, 30)
  
      // cheek R
      stroke(52, 87, 80)
      strokeWeight(4)
      fill(118, 166, 105)
      circle(x3 + 20, y3 + 40, 25)
      noStroke()
      fill(118, 166, 105)
      circle(x3 + 16, y3 + 40, 25)
      // cheek L
      stroke(52, 87, 80)
      strokeWeight(4)
      fill(118, 166, 105)
      circle(x3 - 20, y3 + 40, 27)
      noStroke()
      fill(118, 166, 105)
      circle(x3 - 16, y3 + 40, 27)
  
      // cover the open mouth
      stroke(118, 166, 105)
      strokeWeight(4)
      fill(118, 166, 105)
      ellipse(x3, y3 + 40, 30, 20)
  
      // mouth line
      stroke(52, 87, 80)
      strokeWeight(4)
      line(x3 - 5, y3 + 40, x3 + 5, y3 + 40)
    } // munch animation
  } // if mouse is close
  
  // head movement
  x3 = 200
  y3 = 250
  a3 = (mouseX - x3) / 3
  b3 = (mouseY - y3) / 3
  x3 = x3 + a3;
  y3 = y3 + b3;

  // leaves
  strokeWeight(4)
  stroke(61, 102, 73)
  strokeJoin(ROUND)
  fill(78, 144, 91)
  triangle(tx + 10, ty + 10, 
           tx -50, ty - 50, 
           tx + 0, ty -30)
  tx += (mouseX-tx);
  ty += (mouseY-ty);
  
  strokeWeight(4)
  stroke(61, 102, 73)
  strokeJoin(ROUND)
  fill(78, 144, 91)
  triangle(tx - 20, ty + 10, 
           tx -10, ty - 70, 
           tx + 15, ty -20)
  tx += (mouseX-tx);
  ty += (mouseY-ty);
  
  strokeWeight(4)
  stroke(61, 102, 73)
  strokeJoin(ROUND)
  fill(78, 144, 91)
  triangle(tx + 10, ty - 10, 
           tx + 30, ty - 60, 
           tx + -10, ty -30)
  tx += (mouseX-tx);
  ty += (mouseY-ty);
  // ---- leaves
  
  // strawberry
  strokeWeight(60)
  stroke(215, 73, 93)
  strokeJoin(ROUND)
  fill(215, 73, 93)
  triangle(tx - 10, ty - 10, 
           tx + 10, ty + 20, 
           tx + 10, ty -10)
  tx += (mouseX-tx);
  ty += (mouseY-ty);

  strokeWeight(4)
  stroke(182, 151, 30)
  fill(245, 218, 124)
  ellipse(tx - 15, ty - 5, 5, 10)
  
  strokeWeight(4)
  stroke(182, 151, 30)
  fill(245, 218, 124)
  ellipse(tx + 20, ty - 10, 5, 10)
  
  strokeWeight(4)
  stroke(182, 151, 30)
  fill(245, 218, 124)
  ellipse(tx + 10, ty + 20, 5, 10)
  
  
}

