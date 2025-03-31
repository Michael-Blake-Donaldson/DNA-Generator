import React, { useState } from "react";
import "./MultiStepDNAForm.css";

const MultiStepDNAForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    zodiac: "",
    element: "",
    colors: ["#ffffff", "#000000", "#888888"],
    motif: "",
    animationStyle: "",
    mbti: "",
    alignment: "",
    archetype: "",
    emotion: "",
    gratitude: "",
    fear: "",
    drive: "",
    symbols: [],
    sound: "",
  });

  const symbolsList = ["🦋", "🐍", "⚙️", "🌿", "🔮", "🕸️", "🪞", "🌙", "☀️", "🪐"];

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "color") {
      const index = parseInt(name.split("_")[1]);
      const updatedColors = [...formData.colors];
      updatedColors[index] = value;
      setFormData({ ...formData, colors: updatedColors });
    } else if (name === "symbols") {
      const updated = [...formData.symbols];
      if (updated.includes(value)) {
        setFormData({ ...formData, symbols: updated.filter((s) => s !== value) });
      } else if (updated.length < 3) {
        setFormData({ ...formData, symbols: [...updated, value] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));
  const submit = () => onComplete(formData);

  return (
    <div className="dna-form">
      <h2>Step {step}/5</h2>

      {/* Step 1 – Identity */}
      {step === 1 && (
        <>
          <label>Name (optional):</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} />

          <label>Zodiac Sign:</label>
          <select name="zodiac" value={formData.zodiac} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra",
              "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"].map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>

          <label>Preferred Element:</label>
          <select name="element" value={formData.element} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Fire", "Water", "Earth", "Air", "Void"].map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </>
      )}

      {/* Step 2 – Aesthetics */}
      {step === 2 && (
        <>
          <label>Favorite Colors:</label>
          {formData.colors.map((c, i) => (
            <input key={i} type="color" name={`color_${i}`} value={c} onChange={handleChange} />
          ))}

          <label>Favorite Visual Motif:</label>
          <select name="motif" value={formData.motif} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Fractals", "Minimalism", "Chaotic", "Sacred Geometry"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <label>Preferred Animation Style:</label>
          <select name="animationStyle" value={formData.animationStyle} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Flowy", "Bouncy", "Electric", "Rigid", "Chaotic"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </>
      )}

      {/* Step 3 – Personality */}
      {step === 3 && (
        <>
          <label>MBTI Type:</label>
          <select name="mbti" value={formData.mbti} onChange={handleChange}>
            <option value="">--Select--</option>
            {["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
              "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <label>Moral Alignment:</label>
          <select name="alignment" value={formData.alignment} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Lawful Good", "Neutral Good", "Chaotic Good",
              "Lawful Neutral", "True Neutral", "Chaotic Neutral",
              "Lawful Evil", "Neutral Evil", "Chaotic Evil"].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <label>Archetype:</label>
          <select name="archetype" value={formData.archetype} onChange={handleChange}>
            <option value="">--Select--</option>
            {["The Hero", "The Shadow", "The Sage", "The Rebel", "The Oracle", "The Healer", "The Lover"].map((arc) => (
              <option key={arc}>{arc}</option>
            ))}
          </select>
        </>
      )}

      {/* Step 4 – Emotions */}
      {step === 4 && (
        <>
          <label>Core Emotion Lately:</label>
          <select name="emotion" value={formData.emotion} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Peace", "Sadness", "Joy", "Anxiety", "Hope", "Anger"].map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>

          <label>Something You're Grateful For:</label>
          <textarea name="gratitude" value={formData.gratitude} onChange={handleChange} />

          <label>Something You're Afraid Of:</label>
          <textarea name="fear" value={formData.fear} onChange={handleChange} />

          <label>What Keeps You Going?</label>
          <textarea name="drive" value={formData.drive} onChange={handleChange} />
        </>
      )}

      {/* Step 5 – Symbols */}
      {step === 5 && (
        <>
          <label>Pick up to 3 symbols that resonate with you:</label>
          <div className="symbol-picker">
            {symbolsList.map((symbol) => (
              <button
                key={symbol}
                className={formData.symbols.includes(symbol) ? "selected" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleChange({ target: { name: "symbols", value: symbol } });
                }}
              >
                {symbol}
              </button>
            ))}
          </div>

          <label>Choose a sound or feeling:</label>
          <select name="sound" value={formData.sound} onChange={handleChange}>
            <option value="">--Select--</option>
            {["Echo", "Static", "Hum", "Chime", "Silence"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </>
      )}

      {/* Nav Buttons */}
      <div className="nav-buttons">
        {step > 1 && <button onClick={back}>Back</button>}
        {step < 5 && <button onClick={next}>Next</button>}
        {step === 5 && <button onClick={submit}>Generate My DNA</button>}
      </div>
    </div>
  );
};

export default MultiStepDNAForm;
