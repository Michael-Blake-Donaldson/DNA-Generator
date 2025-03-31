import React, { useState } from "react";
import MultiStepDNAForm from "./components/MultiStepDNAForm";
import DNAVisualizer from "./components/DNAVisualizer";

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="app">
      {!formData ? (
  <MultiStepDNAForm onComplete={handleFormSubmit} />
      ) : (
        <div>
          <h2>Your DNA is forming, {formData.name || "Wanderer"} 🧬</h2>
          <DNAVisualizer formData={formData} />
        </div>
      )}
    </div>
  );
}

export default App;
