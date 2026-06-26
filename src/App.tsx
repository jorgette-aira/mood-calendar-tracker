import { useState } from "react";
import "./App.css";

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
  // Generate a standard 30-day view for testing (June 2026)
  const initialDays: DayLog[] = Array.from({ length: 30 }, (_, i) => ({
    dayNumber: i + 1,
  }));

  const [days, setDays] = useState<DayLog[]>(initialDays);
  const [selectedMood, setSelectedMood] = useState<MoodType>("happy");

  // Assign the currently active pixel sprite to the clicked calendar day
  const handleDayClick = (dayNumber: number) => {
    setDays((prevDays) =>
      prevDays.map((d) =>
        d.dayNumber === dayNumber ? { ...d, mood: selectedMood } : d
      )
    );
  };

  return (
  <div className="app-container">
    {/* Separated and positioned independently to align with your background squares */}
    <button className="icon-btn info-position" title="Info">
      <img src="/src/assets/ui/info.png" alt="Info" className="pixel-art" />
    </button>
    
    <button className="icon-btn close-position" title="Close">
      <img src="/src/assets/ui/close.png" alt="Close" className="pixel-art" />
    </button>

    <header className="pixel-header">
      <h1>June 2026</h1>
      <button className="icon-btn prev-postion" title="Prev">
        <img src="/src/assets/ui/prev.png" alt="Prev" className="pixel-art"/>
      </button>

      <button className="icon-btn next-position" title="Next">
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
    </div>
  );
}