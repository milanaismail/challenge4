let diceFace = 1; // Initialize with a default value

function handleDeviceMotion(evt) {
    if (evt.rotationRate.alpha > 10 || evt.rotationRate.beta > 10 || evt.rotationRate.gamma > 10) {
        diceFace = Math.floor(Math.random() * 6) + 1;
        console.log('Dice face updated to:', diceFace);
    }
}

function requestMotionPermission() {
    console.log('Requesting motion permission...');
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                console.log('DeviceMotionEvent permission state:', permissionState);
                if (permissionState === 'granted') {
                    window.addEventListener('devicemotion', handleDeviceMotion);
                    document.getElementById('motion').classList.add('hidden');
                } else {
                    alert('Permission not granted for Device Motion.');
                }
            })
            .catch(error => {
                console.error('Error requesting Device Motion permission:', error);
                alert('Error requesting Device Motion permission. Check console for details.');
            });
    } else {
        // Handle regular non-iOS 13+ devices
        if (isMobileTablet()) {
            console.log('Non-iOS device, adding event listener for DeviceMotion');
            window.addEventListener('devicemotion', handleDeviceMotion);
            document.getElementById('motion').classList.add('hidden');
        } else {
            alert('Device Motion not supported or not a mobile device.');
        }
    }
}

function isMobileTablet() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
}

// Log to confirm script is loaded
console.log('motion-helper.js loaded');
