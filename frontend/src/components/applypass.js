import React, { useState } from "react";

function ApplyPass() {
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/pass/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, route }),
    });

    const data = await res.json();
    alert("Pass Created! ID: " + data.pass_id);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Apply Bus Pass</h2>

      <input
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Enter Route"
        onChange={(e) => setRoute(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ApplyPass;