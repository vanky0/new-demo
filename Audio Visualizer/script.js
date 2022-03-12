const audioUpload = document.getElementById('audio-upload');
const playPauseBtn = document.getElementById('play-pause-btn');
const audioSource = document.getElementById('audio-source');
const visualizerCanvas = document.getElementById('visualizer');
const canvasCtx = visualizerCanvas.getContext('2d');

// --- Web Audio API Components ---
let audioCtx;
let analyser;
let source;
let isPlaying = false;

// Function to set up the Web Audio API
function setupAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audioSource);
        
        // Connect the nodes in the audio graph
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        // Set up the analyser for frequency data
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Start the visualization loop
        drawVisualizer(bufferLength, dataArray);
    }
}

// Function to handle the audio file upload
audioUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audioSource.src = fileURL;
        playPauseBtn.disabled = false;
        playPauseBtn.textContent = "Play";
        isPlaying = false;
        
        // Set up the audio context once a file is loaded
        setupAudioContext();
    }
});

// Function to play or pause the audio
playPauseBtn.addEventListener('click', () => {
    if (audioSource.paused) {
        audioSource.play();
        playPauseBtn.textContent = "Pause";
        isPlaying = true;
    } else {
        audioSource.pause();
        playPauseBtn.textContent = "Play";
        isPlaying = false;
    }
});

// Function to draw the visualizer
function drawVisualizer(bufferLength, dataArray) {
    // Set the canvas size to match the window size for responsiveness
    visualizerCanvas.width = visualizerCanvas.clientWidth;
    visualizerCanvas.height = visualizerCanvas.clientHeight;
    
    // Clear the canvas
    canvasCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);
    
    // Request the next frame
    requestAnimationFrame(() => drawVisualizer(bufferLength, dataArray));
    
    // Get the frequency data
    analyser.getByteFrequencyData(dataArray);

    const barWidth = (visualizerCanvas.width / bufferLength) * 2;
    let x = 0;
    
    for(let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.5;
        
        // Simple color gradient based on bar height
        const hue = i / bufferLength * 360;
        canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        
        // Draw the bar
        canvasCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);
        
        x += barWidth + 1; // Add a small gap between bars
    }
}

// Ensure the audio context starts on a user gesture
document.addEventListener('click', () => {
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
});

// Handle window resize to keep the canvas responsive
window.addEventListener('resize', () => {
    if (isPlaying) {
        // Redraw the visualizer if a song is playing
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        drawVisualizer(bufferLength, dataArray);
    }
});

const audioUpload = document.getElementById('audio-upload');
const playPauseBtn = document.getElementById('play-pause-btn');
const audioSource = document.getElementById('audio-source');
const visualizerCanvas = document.getElementById('visualizer');
const canvasCtx = visualizerCanvas.getContext('2d');

// --- Web Audio API Components ---
let audioCtx;
let analyser;
let source;
let isPlaying = false;

// Function to set up the Web Audio API
function setupAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audioSource);
        
        // Connect the nodes in the audio graph
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        // Set up the analyser for frequency data
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Start the visualization loop
        drawVisualizer(bufferLength, dataArray);
    }
}

// Function to handle the audio file upload
audioUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const fileURL = URL.createObjectURL(file);
        audioSource.src = fileURL;
        playPauseBtn.disabled = false;
        playPauseBtn.textContent = "Play";
        isPlaying = false;
        