
document.getElementById('motion').onclick = requestMotionPermission;

function drawDice(x, y, size) {
    rectMode(CENTER);
    fill('black');
    rect(x, y, size, size, 10);
  
    fill('white');
    let dotSize = size / 8;
    let spacing = size / 4;
  
    if (diceFace % 2 == 1) {
        ellipse(x, y, dotSize, dotSize); // Center dot
    }
  
    if (diceFace >= 2) {
        ellipse(x - spacing, y - spacing, dotSize, dotSize); // Top left
        ellipse(x + spacing, y + spacing, dotSize, dotSize); // Bottom right
    }
  
    if (diceFace >= 4) {
        ellipse(x - spacing, y + spacing, dotSize, dotSize); // Bottom left
        ellipse(x + spacing, y - spacing, dotSize, dotSize); // Top right
    }
  
    if (diceFace == 6) {
        ellipse(x - spacing, y, dotSize, dotSize); // Left middle
        ellipse(x + spacing, y, dotSize, dotSize); // Right middle
    }
}

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255); // Clear the background on each frame
    let diceSize = min(width, height) * 0.5;
    drawDice(width / 2, height / 2, diceSize);
}
