// Create a sketch that allows a user
// to determine the size and position of
// squares on the canvas. 

// Each square should remain on the canvas.

// When the user presses the mouse button, 
// a shape should be drawn and updated on the 
// canvas whose origin is the original mouse 
// position and whose extent is determined by
// where the mouse is currently.

// When the mouse is released, the shape that 
// was sized is added to an array of shapes 
// that are drawn to the screen every frame. 

// The latest shapes are always drawn last. 

let clickX = 0
let clickY = 0

let endX = 0
let endY = 0
const SHAPE_CIRCLE = 0
const SHAPE_SQUARE = 1
const SHAPE_LINE = 2
let curMode = SHAPE_CIRCLE
let curLine = []
let shapes = []
let circleButton
function clearScreen() {
  shapes = []
}
let types = [
  "circle",
  "square",
  "line"
]
let features = [
  {
    type: SHAPE_CIRCLE,
    setter: () => {
      if(curMode === SHAPE_LINE) {
        shapes.push({line: curLine, shape: curMode})
      }
      curMode = SHAPE_CIRCLE
    }
  },
  {
    type: SHAPE_SQUARE,
    setter: () => {
      if(curMode === SHAPE_LINE) {
        shapes.push({line: curLine, shape: curMode})
      }
      curMode = SHAPE_SQUARE
    }
  },
  {
    type: SHAPE_LINE,
    setter: () => {
      curMode = SHAPE_LINE
      curLine = []
    }
  }
]
function setup() {
    createCanvas(500, 600);
    rectMode(CENTER)
    for(let i = 0; i < features.length; i++) {
      button = createButton(types[features[i].type]);
      button.position(i*60+10, 0);
      console.log("Setting to type " + this.type)
      // curMode = this.type
      button.mousePressed(features[i].setter);
    }
  // }

    button = createButton('clear');
    button.position(200, 0);
    button.mousePressed(clearScreen);
}


function draw() {
    background(255);
    stroke("black")
    noStroke()
    rect(20, 20, width,40)
    text(`current type is ` + curMode, 20, 50)
    text(`clickX: ${clickX.toFixed(2)}, clickY: ${clickY.toFixed(2)}`, 20, 20)
    text(`endX: ${endX.toFixed(2)}, endY: ${endY.toFixed(2)}`, 20, 40)
    for(let i = 0; i < shapes.length; i++) {
      stroke("black")
      let sh = shapes[i]
      // sh.shape
      // sh.x
      // sh.y
      if(sh.shape == SHAPE_SQUARE) {
        square(sh.x, sh.y, 2*dist(sh.x, sh.y, sh.ex, sh.ey, ))
      }
      if(sh.shape == SHAPE_CIRCLE) {
        circle(sh.x, sh.y, 2*dist(sh.x, sh.y, sh.ex, sh.ey, ))
      }
      if(sh.shape == SHAPE_LINE) {
        for(let i = 1; i < sh.line.length; i++) {
          line(sh.line[i-1].x, sh.line[i-1].y, sh.line[i].x, sh.line[i].y)
        }
      }
    }
    if(mouseIsPressed) {
      // rect(clickX,clickY, 100)
      if(curMode === SHAPE_SQUARE) {
        square(clickX, clickY, 2*dist(clickX, clickY, mouseX, mouseY))
      }
      if(curMode === SHAPE_CIRCLE) {
        circle(clickX, clickY, 2*dist(clickX, clickY, mouseX, mouseY))
      }
    }
    if(curMode === SHAPE_LINE) {
      if(curLine.length > 0) {
        if(curLine.length > 1) {
          for(let i = 1; i < curLine.length; i++) {
            line(curLine[i-1].x, curLine[i-1].y, curLine[i].x, curLine[i].y)
          }
        }
        circle(curLine[curLine.length-1].x, curLine[curLine.length-1].y, 10)
        line(curLine[curLine.length-1].x, curLine[curLine.length-1].y, mouseX, mouseY)
      }
    }
}

function mousePressed() {
      clickX = mouseX
      clickY = mouseY
      stroke("black")
      circle(clickX, clickY, 20)
      if(curMode === SHAPE_LINE && mouseY > 30) {
        curLine.push({x:mouseX, y:mouseY})
        console.log(curLine)
      } 
}
function mouseReleased() {
      endX = mouseX
      endY = mouseY
      stroke("red")
      circle(endX, endY, 20)
      if(curMode !== SHAPE_LINE) {
        line(clickX, clickY, endX, endY)
        shapes.push({x: clickX, y: clickY, ex:endX, ey: endY, shape: curMode})
      }
}