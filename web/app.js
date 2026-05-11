const socket = new WebSocket("ws://localhost:8765");

const gesture = document.getElementById("gesture");
const time = document.getElementById("time");
const sensors = document.getElementById("sensors");

let lastSpoken = "";

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    gesture.innerText = data.gesture || "No gesture";
    time.innerText = data.timestamp;
    sensors.innerText = "Sensors: " + data.sensor_values.join(", ");

    if (data.gesture && data.gesture !== lastSpoken) {
        const speech = new SpeechSynthesisUtterance(data.gesture);
        speechSynthesis.speak(speech);
        lastSpoken = data.gesture;
    }
};
