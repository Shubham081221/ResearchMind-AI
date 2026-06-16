import { useState } from "react";
import { useEffect } from "react";
import api from "./services/api";

function App() {

  const [query, setQuery] = useState("");
  const [report, setReport] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleResearch = async () => {

    setLoading(true);

    try {
      const { data } = await api.post("/research", { query });

      if(data.success) {
        setReport(data.report);
        setSources(data.sources);
      }
    } catch (error) {
      console.error(error);

      setReport("Failed to generate research report.");
      setSources([]);
    } finally {
    setLoading(false);
   }
    
  };

  const fetchHistory = async () => {
    try {
      const [ data ] = await api.get("/research/history");

      
      setHistory(data.data);
      } catch {error} {
      console.error("Error fetching history:", error);
      }
    };

    const downloadPDF = async () => {
      try {
        const response = await api.post("/pdf", 
          { query, report },
          { responseType: "blob" }
        );

        const url = window.URL.createObjectURL(
          new Blob([response.data], )
        );

        const link = document.createElement("a");

        link.href=url;
        link.setAttribute("download", `${query}.pdf`);

        document.body.appendChild(link);

        link.click();

        link.remove();

      } catch (error) {
        console.error("Error downloading PDF:", error);

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

      <button onClick={handleResearch} disabled={loading}>
        {loading ? "Researching..." : "Research"}
      </button>

      <button onClick={fetchHistory}>
        View History
      </button>

      <button onClick={downloadPDF} >
        Download PDF
      </button>

      <hr />

      {report && (
        <div>
          <h2>Research Report</h2>

          <pre>{report}</pre>
        </div>  
      )}

      {/* {sources.length > 0 && (
        <div>
          <h2>Sources</h2>

          {sources.map((source, index) => (
            <div key={index}>
              <a 
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
              >{source.title}
              </a>
            </div>    
          ))}
        </div>
      )} */}

      {sources.map((source, index) => (
    <div
      key={index}
      className="border rounded-lg p-4 mb-3"
    >
    <h3 className="font-semibold">
      {source.title}
    </h3>

    <p className="text-sm text-gray-600 mb-2">
      {source.content?.slice(0, 150)}...
    </p>

    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500"
    >
      View Source →
    </a>
   </div>
))}

      
    </div>
  )
}

export default App;