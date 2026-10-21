let cols
let rows
let gridSize = 60
let img;

async function setup() {
  createCanvas(400, 400);
  cols = int(width/gridSize)
  rows = int(height/gridSize)
  // noLoop()

  img = await loadImage('/assets/GUUUUUUBBB2.png');
}

function draw() {
  background(255, 255, 255, 20);
  noStroke();
  // for (let i = 20; i < width; i +=40) {
  //   circle(i, 20, 20)
  // }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * gridSize + gridSize/2; 
      let y = j * gridSize + gridSize/2;
      let upWave = map(sin(frameCount*0.1+i+j), -1, 1, -10, 10)
      push()
      imageMode(CENTER)
      translate(x,y)
      translate(0, upWave)
      // rotate((frameCount*0.02+i+j))
      image(img, 0, 0, gridSize, gridSize)

      
      
      
      pop()

    } // for cols
  } // for rows
  
} // draw

