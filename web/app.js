const socket = new WebSocket("ws://localhost:8765");

const gestureElement = document.getElementById("gesture");
const textElement = document.getElementById("outputText");
const timeElement = document.getElementById("timestamp");
const sensorElement = document.getElementById("sensors");
const languageSelect = document.getElementById("language");

let lastSpoken = "";
let currentGesture = "";

const phrases = {
  "Good morning": {
    english: "Good morning",
    tamil: "காலை வணக்கம்",
    hindi: "सुप्रभात",
    malayalam: "സുപ്രഭാതം",
    telugu: "శుభోదయం"
  },

  "Our project is Smart Sensor Glove": {
    english: "Our project is Smart Sensor Glove",
    tamil: "எங்கள் திட்டம் ஸ்மார்ட் சென்சார் க்ளவ்",
    hindi: "हमारा प्रोजेक्ट स्मार्ट सेंसर ग्लव है",
    malayalam: "ഞങ്ങളുടെ പദ്ധതി സ്മാർട്ട് സെൻസർ ഗ്ലൗവ് ആണ്",
    telugu: "మా ప్రాజెక్ట్ స్మార్ట్ సెన్సర్ గ్లోవ్"
  },

  "It supports speech impaired individuals": {
    english: "It supports speech impaired individuals",
    tamil: "இது பேச்சு குறைபாடு கொண்டவர்களுக்கு உதவுகிறது",
    hindi: "यह वाक् बाधित व्यक्तियों की सहायता करता है",
    malayalam: "ഇത് സംസാര വൈകല്യമുള്ളവരെ സഹായിക്കുന്നു",
    telugu: "ఇది మాట్లాడలేని వారికి సహాయం చేస్తుంది"
  },

  "We are Team Cognexis": {
    english: "We are Team Cognexis",
    tamil: "நாங்கள் டீம் காக்நெக்சிஸ்",
    hindi: "हम टीम कॉग्नेक्सिस हैं",
    malayalam: "ഞങ്ങൾ ടീം കോഗ്നെക്സിസ് ആണ്",
    telugu: "మేము టీమ్ కాగ్నెక్సిస్"
  },

  "Cognexis": {
    english: "Cognexis",
    tamil: "காக்நெக்சிஸ்",
    hindi: "कॉग्नेक्सिस",
    malayalam: "കോഗ്നെക്സിസ്",
    telugu: "కాగ్నెక్సిస్"
  }
};

function getSelectedLanguage() {
  return languageSelect.value;
}

function speak(text) {
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);

  const langMap = {
    english: "en-IN",
    tamil: "ta-IN",
    hindi: "hi-IN",
    malayalam: "ml-IN",
    telugu: "te-IN"
  };

  utterance.lang = langMap[getSelectedLanguage()];
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function updateOutput(gesture) {
  currentGesture = gesture;

  if (!phrases[gesture]) return;

  const language = getSelectedLanguage();
  const output = phrases[gesture][language];

  gestureElement.innerText = gesture;
  textElement.innerText = output;

  if (gesture !== lastSpoken) {
    speak(output);
    lastSpoken = gesture;
  }
}

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  timeElement.innerText = data.timestamp;
  sensorElement.innerText =
    "F1: " + data.sensor_values[0] +
    " | F2: " + data.sensor_values[1] +
    " | F3: " + data.sensor_values[2] +
    " | F4: " + data.sensor_values[3];

  if (data.gesture && data.gesture !== "") {
    updateOutput(data.gesture);
  }
};

languageSelect.addEventListener("change", () => {
  if (currentGesture !== "") {
    updateOutput(currentGesture);
  }
});
