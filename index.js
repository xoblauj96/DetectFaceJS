const video = document.getElementById("videoElement");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('FetectFaceJS/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('FetectFaceJS/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('FetectFaceJS/FetectFaceJS/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('FetectFaceJS/models')
]).then(startVideo)

console.log(video);
function startVideo() {

    navigator.getUserMedia(
        { video: true },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas,displaySize)

    setInterval(async () => {
        console.log(canvas);
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        console.log(detections);
    }, 100)
})
// update
