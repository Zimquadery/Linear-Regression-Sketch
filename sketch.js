let p = [];
let m, b;
let xsum = 0,
  ysum = 0;
let btn;
function setup() {
  createCanvas(windowWidth, windowHeight);
  btn = createButton("Reset")
    .position(10, 10)
    .mouseReleased(() => {
      p = [];
      xsum = 0;
      ysum = 0;
    });
}

function draw() {
  background(30);
  stroke(255);
  strokeWeight(5);
  for (let i = 0; i < p.length; i++) {
    let yy = map(p[i].y, 0, height, height, 0);
    point(p[i].x, yy);
  }
  if (p.length > 1) {
    linearRegression();
  }
  noStroke();
  fill(200);
  textSize(25);
  textAlign(CENTER, CENTER);
  text("Linear Regression", width / 2, 20);
  textSize(15);
  fill(150);
  text("Click to add points ", width / 2, 50);
}
function mouseReleased() {
  if (
    !(mouseX > btn.position().x &&
    mouseX < btn.position().x + btn.width &&
    mouseY > btn.position().y &&
    mouseY < btn.position().y + btn.height)
  ) {
    let yy = map(mouseY, 0, height, height, 0);
    p.push({ x: mouseX, y: yy });
    xsum += mouseX;
    ysum += yy;
  }
}
function drawline() {
  let x1 = 0;
  let y1 = m * x1 + b;
  let x2 = width;
  let y2 = m * x2 + b;
  y1 = map(y1, 0, height, height, 0);
  y2 = map(y2, 0, height, height, 0);
  stroke(50, 55, 250);
  strokeWeight(2);
  line(x1, y1, x2, y2);
}
function linearRegression() {
  let n = p.length;
  let xMean = xsum / n;
  let yMean = ysum / n;
  let up = 0;
  let down = 0;
  for (let i = 0; i < n; i++) {
    up += (p[i].x - xMean) * (p[i].y - yMean);
    down += (p[i].x - xMean) * (p[i].x - xMean);
  }
  m = up / down;
  b = yMean - m * xMean;
  drawline();
}
