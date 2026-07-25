import React from "react";

function Dashboard() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Your Bus Pass</h2>

      <img
        src="http://127.0.0.1:5000/qrcodes/1.png"
        alt="QR Code"
        width="200"
      />

      <p>Scan this QR in bus</p>
    </div>
  );
}

export default Dashboard;