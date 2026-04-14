import React from "react";

function App() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🚌 Bus Pass System</h1>

      <button onClick={() => alert("Apply Pass")}>
        Apply Pass
      </button>

      <br /><br />

      <button onClick={() => alert("Dashboard")}>
        Dashboard
      </button>

      <br /><br />

      <button onClick={() => alert("Admin Panel")}>
        Admin Panel
      </button>
    </div>
  );
}

export default App;