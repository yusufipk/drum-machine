import "./App.css";
import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "heater-1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "heater-2",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "heater-3",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "kick",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "kick-1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "chord-1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "dry-ohh",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "side-stick",
    file: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "punchy-kick",
    file: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
];

function App() {
  const [volume, setVolume] = React.useState(1);
  const [muted, setMuted] = useState(false);
  const [recording, setRecording] = React.useState("");

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 300);
    setTimeout(() => clearInterval(interval), 300 * recordArray.length - 1);
  };

  return (
    <div id="drum-machine" className="bg-dark w-100 text-white container">
      <div id="display" className="text-center">
        <h2>Drum Machine</h2>
        {audioClips.map((clip) => (
          <Pad
            key={clip.id}
            clip={clip}
            volume={volume}
            muted={muted}
            setRecording={setRecording}
          />
        ))}
        <br />
        <input
          type="range"
          step="0.01"
          onChange={(event) => {
            setVolume(event.target.valueAsNumber);
          }}
          value={volume}
          max="1"
          min="0"
          className="w-30"
        />
        <button
          className="btn btn-secondary m-3 p-1"
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? "muted" : "unmuted"}
        </button>
        <h3>{recording}</h3>
        {recording && (
          <>
            <button onClick={playRecording} className="btn btn-success m-3">
              play
            </button>
            <button onClick={() => setRecording("")} className="btn btn-danger">
              clear
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Pad({ clip, volume, muted, setRecording }) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 150);
    audioTag.currentTime = 0;
    if (muted == false) {
      audioTag.volume = volume;
      audioTag.play();
    } else {
      audioTag.volume = 0;
    }
    setRecording((prev) => prev + clip.keyTrigger + " ");
  };

  return (
    <div
      onClick={playSound}
      className={`drum-pad btn btn-secondary p-5 m-5 ${
        active && "drum-pad btn-danger"
      }`}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.file} />
      {clip.keyTrigger}
    </div>
  );
}

export default App;
