let showCirclesCheckbox
let circleNumSlider
let circleGapSlider

let showTri1Checkbox
let Tri1NumSlider
let Tri1LengthSlider
let Tri1SpinSLider
let Tri1DistSlider
let TriColorPicker

let showLines2Checkbox
let lines2NumSlider
let lines2LengthSlider
let lines2SpinSLider
let lines2DistSlider

let bgColorPicker

let jpgButton

function setup() {
  createCanvas(400, 400);
  noFill()
  strokeWeight(10)

  // circles
  createP("circles")
  showCirclesCheckbox = createCheckbox("show", true)
  circleNumSlider = createSlider(1, 15, 3) // (min, max, default, step)
  circleGapSlider = createSlider(20, 100)
  circleStrokeWeight = createSlider(5,40, 10)
  fromColorPicker = createColorPicker("#ffcb70")
  toColorPicker = createColorPicker("#ff7b00")

  // triangles
  createP("triangles")
  showTri1Checkbox = createCheckbox("show", true)
  Tri1NumSlider = createSlider(1, 20, 8) 
  Tri1LengthSlider = createSlider(1, 200, 100)
  Tri1SpinSLider = createSlider(0, 360, 270)
  Tri1DistSlider = createSlider(0, 150, 100)
  TriColorPicker = createColorPicker("#ffce1f")

  // createP("lines 2")

  // showLines2Checkbox = createCheckbox("show", true)
  // lines2NumSlider = createSlider(1, 20, 5) 
  // lines2LengthSlider = createSlider(5, 200, 50)
  // lines2SpinSLider = createSlider(0, 360, 90, 5)
  // lines2DistSlider = createSlider(0, 150, 100)

  createP("background color")
  bgColorPicker = createColorPicker("#d1f4ff")

  createP("save")
  jpgButton = createButton("export jpg")
  jpgButton.mousePressed(function() {
    saveCanvas("myCanvas", "jpg")
  }) // jpg button
}

function draw() {
  background(bgColorPicker.value());
  // make canvas center 0, 0
  translate(width/2, height/2)
  // rotate(frameCount * .01)
  // circle(0, 0, 50)
  // rect(0, 0, 50, 50)

  if (showCirclesCheckbox.checked()) {
    drawCircles()
  } // show circles

  if (showTri1Checkbox.checked()) {
    drawTri1()
  } // show Tri1

  // if (showLines2Checkbox.checked()) {
  //   drawLines2()
  // } // show lines2
  
} // draw

function drawCircles() {
    // input num of circles
  let num = circleNumSlider.value() // input num circles
  let gap = circleGapSlider.value() // input gap between circles
  let circleStroke = circleStrokeWeight.value()
  let from = color(fromColorPicker.value())
  let to = color(toColorPicker.value())

  for (let i = 0; i < num; i++) {
    push()
    stroke(lerpColor(from, to, i/num))
    strokeWeight(circleStroke)
    circle(0, 0, (i + 1) * gap)
    pop()
  } // for
} // drawCircles

function drawTri1() {
  // draw lines
  let num = Tri1NumSlider.value()
  let len = Tri1LengthSlider.value()
  let TriColor = TriColorPicker.value()
  for (let i = 0; i < num; i++) {
    push()
    rotate(frameCount*0.01)
    stroke(TriColor)
    fill(TriColor)
    rotate(i/num * TWO_PI)
    translate(Tri1DistSlider.value(), 0) // dist from center
    rotate(radians(Tri1SpinSLider.value()))
    triangle(1, len/2, 20, 0, -20, 0)
    pop()
  } // for
} // drawLines1

// function drawLines2() {
//   // draw lines
//   let num = lines2NumSlider.value()
//   let len = lines2LengthSlider.value()
//   for (let i = 0; i < num; i++) {
//     push()
//     stroke("#ffffff")
//     rotate(i/num * TWO_PI)
//     translate(lines2DistSlider.value(), 0) // dist from center
//     rotate(radians(lines2SpinSLider.value()))
//     line(-len/2, 0, len/2, 0)
//     pop()
//   } // for
// } // drawLines1