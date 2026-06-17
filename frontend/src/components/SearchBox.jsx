

function SearchBox({
  query,
  setQuery,
  loading,
  handleResearch,
  downloadPDF,
  startNewResearch,
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl">

      <h1 className="text-3xl font-bold mb-4">
        ResearchMind AI
      </h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter research topic..."
        className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700"
      />

      <div className="flex gap-4 mt-4">

        <button
          onClick={handleResearch}
          className="px-6 py-3 bg-blue-600 rounded-lg"
        >
          {loading ? "Researching..." : "Research"}
        </button>

        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-green-600 rounded-lg"
        >
          Download PDF
        </button>

        <button
         onClick={startNewResearch}
         className="
         px-6
         py-3
         bg-slate-700
         rounded-lg
        "
        >
         New Research
        </button>

      </div>

    </div>
  );
}

export default SearchBox;