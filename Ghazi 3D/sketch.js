let canvasWidth = 750;
let canvasHeight = 550;
let player;
let obstacles = [];
let score = 0;
let gameOver = false;
let gameSpeed = 5;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  player = new Player();
  obstacles.push(new Obstacle());
}

function draw() {
  background(135, 206, 235);
  
  push();
  drawBackground();
  pop();

  if (!gameOver) {
    player.update();
    player.show();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
      score++;
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (obstacles[i].hits(player)) {
        gameOver = true;
      }

      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    fill(0);
    textSize(20);
    text("Score: " + score, 20, 30);
  } else {
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);
    text("Score: " + score, width / 2, height / 2 + 40);
    text("Press SPACE or CLICK to retry", width / 2, height / 2 + 80);
  }
}

function keyPressed() {
  if (key === ' ') {
    if (gameOver) {
      resetGame();
    } else {
      player.jump();
    }
  }
}

function mousePressed() {
  if (gameOver) {
    resetGame();
  } else {
    player.jump();
  }
}

function resetGame() {
  player = new Player();
  obstacles = [];
  score = 0;
  gameOver = false;
  gameSpeed = 5;
}

class Player {
  constructor() {
    this.x = 100;
    this.y = canvasHeight - 110; // Adjust y to position the player at the bottom
    this.baseY = canvasHeight - 110;
    this.velocity = 0;
    this.gravity = 0.8;
    this.jumpForce = -15;
    this.isJumping = false;
    this.width = 80;
    this.height = 70;
  }

  jump() {
    if (!this.isJumping) {
      this.velocity = this.jumpForce;
      this.isJumping = true;
    }
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > this.baseY) {
      this.y = this.baseY;
      this.velocity = 0;
      this.isJumping = false;
    }
  }

  show() {
    fill(150, 75, 0);
    noStroke();
    // Body
    rect(this.x, this.y, 80, 40, 15);
    // Neck and head
    beginShape();
    vertex(this.x + 20, this.y + 5);
    vertex(this.x + 90, this.y - 30);
    vertex(this.x + 105, this.y - 20);
    vertex(this.x + 95, this.y + 5);
    endShape(CLOSE);
    // Legs
    rect(this.x + 10, this.y + 40, 15, 30);
    rect(this.x + 50, this.y + 40, 15, 30);
    // Hump
    beginShape();
    vertex(this.x + 20, this.y);
    bezierVertex(this.x + 50, this.y - 25, this.x + 70, this.y - 25, this.x + 90, this.y);
    endShape();
  }
}

class Obstacle {
  constructor() {
    this.x = width - 50;
    this.y = canvasHeight - 90; // Adjust y to position the obstacle at the bottom
    this.w = 20;
    this.h = 40;
  }

  update() {
    this.x -= gameSpeed;
  }

  show() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }

  offscreen() {
    return this.x < -this.w - 50;
  }

  hits(player) {
    return (
      player.x + player.width > this.x &&
      player.x < this.x + this.w &&
      player.y + player.height > this.y &&
      player.y < this.y + this.h
    );
  }
}

function drawBackground() {
  let drawingWidth = 470 + 100 + 100; 
  let drawingHeight = 250 + 60 + 20;  
  translate(canvasWidth - drawingWidth - 50, canvasHeight - drawingHeight - 50);
  // Clouds
  fill(240); 
  noStroke();
  ellipse(50, 50, 70, 50);
  ellipse(80, 50, 70, 50);
  ellipse(65, 60, 70, 50);
  ellipse(50, 70, 20, 20);
  ellipse(75, 70, 20, 20);
  
  ellipse(220, 80, 70, 50);
  ellipse(250, 80, 70, 50);
  ellipse(235, 90, 70, 50);
  ellipse(220, 100, 40, 20);
  ellipse(245, 100, 40, 20);
  
  ellipse(520, 190, 70, 50);
  ellipse(550, 190, 70, 50);
  ellipse(535, 190, 70, 50);
  ellipse(520, 190, 40, 20);
  ellipse(545, 190, 40, 20);
  
  ellipse(420, -80, 70, 50);
  ellipse(450, -80, 70, 50);
  ellipse(435, -60, 70, 50);
  ellipse(420, -100, 40, 20);
  ellipse(445, -100, 40, 20);
  
  fill("#CDB79E");
  stroke("#8B8780");
  ellipse(400, 350, 600, 200);
  ellipse(533, 350, 600, 200);
  fill(255, 255, 0);
  noStroke();
  ellipse(520, -100, 40 * 2);
  
  fill(0);
  noStroke();
  
  // City
  stroke("#FFFFFF");
  circle(600, 190, 120, 20);
  noStroke();
  rect(600, 200, 100, 100, 20, 15, 10, 5);
  rect(500, 200, 100, 100, 20, 15, 10, 5);
  
  rect(590, 100, 20, 50, 20, 12, 10);
  arc(601, 94, 30, 30, 0, PI - 200);
  rect(490, 110, 30, 200, 20, 15, 10, 5);
  rect(682, 110, 30, 200, 20, 15, 10, 5);
  rect(301, 250, 200, 60, 20, 15, 0, 0);
  rect(290, 160, 20, 150, 20, 15, 10, 5);
  rect(311, 180, 15, 90, 20, 15, 10, 5);
  rect(500, 290, 200, 20);
  
  // Dunes
  fill("#CDB79E");
  stroke("#8B8780");
  ellipse(50, 350, 400, 200);
  ellipse(653, 380, 400, 200);
  ellipse(5, 350, 300, 300);
  
  // Road
  fill("#9A938C");
  noStroke();
  rect(-30, canvasHeight - 240, canvasWidth, 200);
}
