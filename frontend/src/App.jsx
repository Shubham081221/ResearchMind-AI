import { useState } from "react";
import api from "./services/api";

function App() {

  const [query, setQuery] = useState("");
  const [report, setReport] = useState("");

  const handleResearch = async () => {
    try {
      const { data } = await api.post("/research", { query });

      setReport(data.report);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ResearchMind AI</h1>

      <input 
          type="text"
          placeholder="Enter your research topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      <button onClick={handleResearch}>Research</button>

      <hr />

      <pre>{report}</pre>
    </div>
  )
}

export default App;