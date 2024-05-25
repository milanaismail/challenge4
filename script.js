let diceNumber;

function setup() {
  createCanvas(400, 400);
  textSize(32);
  textAlign(CENTER, CENTER);
  // Request motion permission
  document.getElementById('motion').onclick = requestMotionPermission;
}

function draw() {
  background(220);
  // Display the dice number
  text(diceNumber, width / 2, height / 2);
}

// Function to handle motion permission request
function requestMotionPermission() {
  DeviceMotionEvent.requestPermission().then(response => {
    if (response == 'granted') {
      // Add event listener for device motion
      window.addEventListener('devicemotion', motionHandler);
    }
  }).catch(console.error);
}

// Function to handle device motion
function motionHandler(event) {
  // Calculate total acceleration
  let totalAcceleration = event.acceleration.x + event.acceleration.y + event.acceleration.z;
  // Check if the device is shaken
  if (totalAcceleration > 30) { // Adjust this threshold according to your preference
    // Generate a random dice number between 1 and 6
    diceNumber = Math.floor(random(1, 7));
  }
}