import React, { useState } from "react";
import UserInputForm from "./components/UserInputForm";

function App() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("User submitted:", data);
    // Next we'll generate DNA from this!
  };

  return (
    <div className="app">
      {!formData ? (
        <UserInputForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <h2>Your DNA is being generated...</h2>
          {/* We'll show the visual generator here in next step */}
        </div>
      )}
    </div>
  );
}

export default App;
