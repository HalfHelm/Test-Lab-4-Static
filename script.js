const pianoKeys = [
    { note: "C", key: "a", elementId: "keyC"},
    { note: "D", key: "s", elementId: "keyD"},
    { note: "E", key: "d", elementId: "keyE"},
    { note: "F", key: "f", elementId: "keyF"},
    { note: "G", key: "g", elementId: "keyG"},
    { note: "A", key: "h", elementId: "keyA"},
    { note: "B", key: "j", elementId: "keyB"},
];

let loadedMelody = [];
let currentMelodyInterval = null;
let isMelodyPlaying = false;

fetch("notes.json") 
    .then(response => response.json()) // Convert the response to obj
    .then(data => {
        loadedMelody = data.melody; //ausgabe der melody aus dem json
        console.log("Jetzt ist die Melodie geladen: ", loadedMelody); 
    })
    .catch(error => console.error("Fehler beim Laden der Melodie: ", error));


function playSound(note) {
    console.log("Spiele Note: ", note);

    let audio = new Audio(`sounds/${note}.mp3`); // Pfad zum Soundfile
    audio.play();

    const keyObj = pianoKeys.find(k => k.note === note); // obj finden
    if(keyObj){
        const el = document.getElementById(keyObj.elementId); // element holen
        el.classList.add("active"); //klasse (gelb unterlegt)

        setTimeout(() => {
            el.classList.remove("active");
        }, 1200); //buttons bleiben 1200 ms gelb
    }
}

function playMelody(melody) {
    // Guard: ensure melody is defined and non-empty
    if(!melody || !Array.isArray(melody) || melody.length === 0) {
        console.warn("No melody available to play.");
        const btn = document.getElementById("playPauseBtn");
        if(btn) btn.textContent = "Play Loaded Melody";
        isMelodyPlaying = false;
        return;
    }
    if(isMelodyPlaying) {
        // Pause
        clearInterval(currentMelodyInterval);
        isMelodyPlaying = false;
        document.getElementById("playPauseBtn").textContent = "Play Loaded Melody";
        return;
    }

    // Play
    isMelodyPlaying = true;
    document.getElementById("playPauseBtn").textContent = "Pause";
    let i = 0;

    currentMelodyInterval = setInterval(() => {
        if(i >= melody.length) {
            clearInterval(currentMelodyInterval);
            isMelodyPlaying = false;
            document.getElementById("playPauseBtn").textContent = "Play Loaded Melody";
            return;
        }
        playSound(melody[i]);
        i++;
    }, 1500);
}

// Attach click listener to play/pause button (avoid inline onclick to access block-scoped variables)
const playBtn = document.getElementById("playPauseBtn");
if(playBtn) {
    playBtn.addEventListener("click", () => playMelody(loadedMelody));
}

pianoKeys.forEach(keyObj => {
    const el = document.getElementById(keyObj.elementId);

    el.addEventListener("click", () => {
        playSound(keyObj.note);
    });
});

document.addEventListener("keydown", function(event) {

    const keyObj = pianoKeys.find(k => k.key === event.key); // obj finden

    if(keyObj){
        playSound(keyObj.note);
    }
});

document.getElementById("resetBtn").addEventListener("click", resetGame); 

function resetGame() {
    // Stop any playing melody
    if(currentMelodyInterval) {
        clearInterval(currentMelodyInterval);
        currentMelodyInterval = null;
        isMelodyPlaying = false;
    }

    // Reset UI
    pianoKeys.forEach(keyObj => {
        const el = document.getElementById(keyObj.elementId);
        el.classList.remove("active");
    });

    // Reset button text
    document.getElementById("playPauseBtn").textContent = "Play Loaded Melody";

    console.log("Game reset!");
}

// Keyboard Shortcuts
document.addEventListener("keydown", function(event) {
    // Space = Play/Pause Melody
    if(event.code === "Space" && loadedMelody.length > 0) {
        event.preventDefault();
        playMelody(loadedMelody);
    }
    // R = Reset
    if(event.key.toLowerCase() === "r") {
        resetGame();
    }
});