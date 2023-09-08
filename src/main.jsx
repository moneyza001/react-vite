import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Button from "@mui/material/Button";
function App() {
  return (
    <div>
      <Button variant="text">Node</Button>
      <Button variant="contained" disabled>
        Node
      </Button>
      <Button variant="outlined">Node</Button>
      <Button variant="contained" color="primary">
        Node
      </Button>
      <Button variant="contained" color="secondary">
        Node
      </Button>
      <Button variant="contained" color="success">
        Node
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => alert("Hello")}
        sx={{ padding: "20px", borderRadius: "10px", marginTop: "20px" }}
      >
        Node
      </Button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
