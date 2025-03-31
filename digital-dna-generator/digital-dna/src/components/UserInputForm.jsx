import React, { useState } from "react";

const UserInputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    interests: "",
    traits: [],
    emotion: "",
    moment: "",
    goals: "",
  });

  const traitsOptions = [
    "Curious",
    "Empathetic",
    "Analytical",
    "Adventurous",
    "Creative",
    "Grounded",
    "Ambitious",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedTraits = [...formData.traits];
      if (checked) {
        updatedTraits.push(value);
      } else {
        updatedTraits = updatedTraits.filter((trait) => trait !== value);
      }
      setFormData({ ...formData, traits: updatedTraits });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // pass form data to parent
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Create Your Digital DNA</h2>

      <label>Name (optional):</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <label>What are you into?</label>
      <textarea name="interests" value={formData.interests} onChange={handleChange} />

      <label>Pick your personality traits:</label>
      {traitsOptions.map((trait) => (
        <div key={trait}>
          <input
            type="checkbox"
            name="traits"
            value={trait}
            checked={formData.traits.includes(trait)}
            onChange={handleChange}
          />
          <label>{trait}</label>
        </div>
      ))}

      <label>Your current vibe:</label>
      <select name="emotion" value={formData.emotion} onChange={handleChange}>
        <option value="">-- Select --</option>
        <option value="Calm">Calm</option>
        <option value="Energetic">Energetic</option>
        <option value="Anxious">Anxious</option>
        <option value="Inspired">Inspired</option>
        <option value="Melancholic">Melancholic</option>
      </select>

      <label>A defining moment in your life:</label>
      <textarea name="moment" value={formData.moment} onChange={handleChange} />

      <label>What drives you?</label>
      <textarea name="goals" value={formData.goals} onChange={handleChange} />

      <button type="submit">Generate My DNA</button>
    </form>
  );
};

export default UserInputForm;
