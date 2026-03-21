import React, { useState } from "react";
import API from "../api/api";

function ApplyPass() {
  const [route, setRoute] = useState("");

  const apply = async () => {
    await API.post("/pass/apply", { route });
    alert("Pass Applied");
  };

  return (
    <div>
      <h2>Apply Bus Pass</h2>
      <input onChange={(e) => setRoute(e.target.value)} placeholder="Route" />
      <button onClick={apply}>Apply</button>
    </div>
  );
}

export default ApplyPass;