import React, { useState } from "react";
import UserInputForm from "./components/UserInputForm";
import DNAVisualizer from "./components/DNAVisualizer";

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="app">
      {!formData ? (
        <UserInputForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <h2>Here’s Your Digital DNA, {formData.name || "Explorer"} ✨</h2>
          <DNAVisualizer formData={formData} />
        </div>
      )}
    </div>
  );
}

export default App;
