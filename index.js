const video = document.getElementById("videoElement");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.faceExpressionNet.loadFromUri('models')
]).then(startVideo)

console.log(video);
function startVideo() {

    navigator.getUserMedia(
        { video: true },
        stream => video.srcObject = stream,
        (err) =>{
                err => console.error(err)
                alert("Error"+err)
        }
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
// update thank you very much now i have success my project
