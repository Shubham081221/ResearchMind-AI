

function HistorySidebar({ history, openHistoryItem, }) {

  return (
    <div className="w-80 border-r border-slate-800 h-full overflow-y-auto p-4 flex-shrink-0">

      <h2 className="text-xl font-bold mb-4">
        History
      </h2>

      {history.map((item) => (

        <div
          key={item.id}
          onClick={() => openHistoryItem(item)}
          className="
            bg-slate-900
            p-3
            rounded-lg
            mb-2
            cursor-pointer
          "
        >
          {item.query}
        </div>

      ))}

    </div>
  );
}

export default HistorySidebar;