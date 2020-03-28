// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera > video"),
    cameraOutput = document.querySelector("#camera > img"),
    cameraSensor = document.querySelector("#camera > canvas")

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            jsQR.track = stream.getTracks()[0];
            cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
    start();
} 

// Called after camera is setup
const start = () => {
    window.setInterval(scan, 0);
}

// Scans camera for QR code
const scan = () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(cameraOutput, 0, 0);
    var imageData = ctx.getImageData(0,0,cameraSensor.width,cameraSensor.height);

    const qrCode = jsQR(imageData.data,cameraSensor.width,cameraSensor.height);

    // If QR code is found
    if(qrCode != null){
        alert(qrCode.data);
    }
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);