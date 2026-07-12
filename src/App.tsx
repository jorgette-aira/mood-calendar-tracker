import { useState } from "react";
import "./App.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

// 1. Strict TypeScript definition matching your hand-drawn mood assets
type MoodType = "happy" | "sad" | "angry" | "anxiety" | "ennui" | "in love";

interface DayLog {
  dayNumber: number;
  mood?: MoodType;
}

// 2. Direct mapping matching your exact file names from image_bc8f1f.png
const moodAssets: Record<MoodType, string> = {
  happy: "/src/assets/moods/happy.png",
  sad: "/src/assets/moods/sad.png",
  angry: "/src/assets/moods/angry.png",
  anxiety: "/src/assets/moods/anxiety.png",
  ennui: "/src/assets/moods/ennui.png",
  "in love": "/src/assets/moods/in love.png",
};

export default function App() {
  // STATE
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 1));
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>("happy");
  const [days, setDays] = useState<DayLog[]>(
    Array.from({ length: 30 }, (_, i) => ({ dayNumber: i + 1 }))
  );

  // BUTTONS

  // Info Button
  const toggleInfoMenu = () => {
    setIsInfoOpen((prev) => !prev);
  };

  // Prev Month Button
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Next Month Button
  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Day click handler
  const handleDayClick = (dayNumber: number) => {
    setDays((prevDays) =>
      prevDays.map((d) =>
        d.dayNumber === dayNumber ? { ...d, mood: selectedMood } : d
      )
    );
  };
  
  // Format month title dynamically
  const formattedMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });


  return (
  <div className="app-container">
    <button className="icon-btn info-position" title="Info" onClick={toggleInfoMenu}>
      <img src="/src/assets/ui/info.png" alt="Info" className="pixel-art" />
    </button>
    
    <button className="icon-btn close-position" title="Close" onClick={handleClose}>
      <img src="/src/assets/ui/close.png" alt="Close" className="pixel-art" />
    </button>

    <header className="pixel-header">
      <button className="icon-btn prev-position" title="Prev" onClick={handlePrevMonth}>
        <img src="/src/assets/ui/prev.png" alt="Prev" className="pixel-art"/>
      </button>

      <h1>{formattedMonth}</h1>
      
      <button className="icon-btn next-position" title="Next" onClick={handleNextMonth}>
        <img src="/src/assets/ui/next.png" alt="Next" className="pixel-art"/>
      </button>
    </header>

      {/* Weekday Label Row */}
      <div className="weekdays-grid">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
          <div key={idx} className="weekday-lbl">{day}</div>
        ))}
      </div>

      {/* Main Grid Render Layer */}
      <div className="calendar-grid">
        {days.map((day) => (
          <button
            key={day.dayNumber}
            className="calendar-tile"
            onClick={() => handleDayClick(day.dayNumber)}
          >
            <span className="day-number">{day.dayNumber}</span>
            {day.mood && (
              <img
                src={moodAssets[day.mood]}
                alt={day.mood}
                className="pixel-art tile-mood"
              />
            )}
          </button>
        ))}
      </div>

      {/* Bottom Mood Stamping Dock */}
      <div className="mood-palette-box">
        <h3>Select Stamp</h3>
        <div className="palette-options">
          {(Object.keys(moodAssets) as MoodType[]).map((mood) => (
            <button
              key={mood}
              className={`palette-tile ${selectedMood === mood ? "active" : ""}`}
              onClick={() => setSelectedMood(mood)}
              title={mood}
            >
              <img src={moodAssets[mood]} alt={mood} className="pixel-art" />
            </button>
          ))}
        </div>
      </div>
      {isInfoOpen && (
        <div className="popup-overlay" onClick={toggleInfoMenu}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Pixel Mood Tracker</h2>
              <button className="popup-close-x" onClick={toggleInfoMenu}>×</button>
            </div>
            <div className="popup-body">
            <p><b>How to Use:</b></p>
            <ul>
              <li>Pick a mood heart from the bottom palette.</li>
              <li>Click any date box to log your daily stamp!</li>
              <li>Use arrows to navigate between months.</li>
            </ul>

            <div className="popup-legend-title"><b>Mood:</b></div>
            <div className="popup-mood-grid">
              {(Object.keys(moodAssets) as MoodType[]).map((mood) => (
                <div key={mood} className="legend-item">
                  <img src={moodAssets[mood]} alt={mood} className="pixel-art legend-icon" />
                  <span className="legend-label">{mood}</span>
                </div>
              ))}
            </div>
          </div>
            <button className="popup-action-btn" onClick={toggleInfoMenu}>Got It!</button>
          </div>
        </div>
      )}
    </div>
  );
}