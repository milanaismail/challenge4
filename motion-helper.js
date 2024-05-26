let initialAlpha = null;
let isMoving = false;
let movementThreshold = 5; // Threshold to detect significant movement

// Function to handle device orientation event
function handleDeviceOrientation(evt) {
    if (initialAlpha === null) {
        initialAlpha = evt.alpha;
    }

    let alphaDifference = Math.abs(evt.alpha - initialAlpha);

    if (alphaDifference > movementThreshold) {
        if (!isMoving) {
            isMoving = true;
            diceFace = Math.floor(Math.random() * 6) + 1;
            console.log("Dice face:", diceFace);
        }
    } else {
        isMoving = false;
    }
}

// Request orientation permission for iOS
function requestMotionPermission() {
    let isMobile = isMobileTablet();
    let iOS = is_iOS();
    console.log("Requesting motion permission...");

    if (iOS) {
        console.log("This is an iOS device");
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    console.log("Permission response:", response);
                    if (response === 'granted') {
                        window.addEventListener('deviceorientation', handleDeviceOrientation);
                        document.getElementById('motion').classList.add('hidden');
                    } else {
                        alert("Permission not granted");
                    }
                })
                .catch((error) => {
                    console.error('DeviceOrientationEvent.requestPermission error:', error);
                    alert("Permission not granted. Please ensure you are using Safari on iOS 13 or later.");
                });
        } else {
            console.log('DeviceOrientationEvent.requestPermission is not a function');
            alert("DeviceOrientationEvent.requestPermission is not supported on this device.");
        }
    } else if (isMobile) {
        console.log("This is an Android device");
        alert("Orientation detection enabled for Android devices");
        window.addEventListener('deviceorientation', handleDeviceOrientation);
        document.getElementById('motion').classList.add('hidden');
    } else {
        console.log("This is not a mobile device");
        alert("Orientation detection is only needed on mobile devices");
        simulateDeviceOrientation(); // Simulate device orientation for testing on desktop
    }
}

// Function to detect if the device is iOS
function is_iOS() {
    return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

// Function to detect if the device is mobile or tablet
function isMobileTablet() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

// Simulate device orientation for testing purposes
function simulateDeviceOrientation() {
    setInterval(() => {
        const event = new CustomEvent('deviceorientation', {
            detail: {
                alpha: Math.random() * 360, // Simulate random orientation angles
                beta: Math.random() * 180 - 90,
                gamma: Math.random() * 180 - 90
            }
        });
        window.dispatchEvent(event);
    }, 1000); // Simulate device orientation every second
}

window.addEventListener('deviceorientation', (event) => {
    const evt = event.detail ? event.detail : event;
    handleDeviceOrientation(evt);
});
