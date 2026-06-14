import { useState } from "react";
import api from "./services/api";

function App() {

  const [query, setQuery] = useState("");
  const [report, setReport] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleResearch = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/research", { query });

      setReport(data.report);
      setSources(data.sources);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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

      <button onClick={handleResearch} disabled={loading}>
        {loading ? "Researching..." : "Research"}
      </button>

      <hr />

      {report && (
        <div>
          <h2>Research Report</h2>

          <pre>{report}</pre>
        </div>  
      )}

      
    </div>
  )
}

export default App;