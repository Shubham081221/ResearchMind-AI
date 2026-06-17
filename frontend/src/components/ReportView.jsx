

function ReportView({ report }) {

  if (!report) return null;

  return (
    <div className="bg-slate-900 p-6 rounded-xl mt-6 max-w-full overflow-x-auto">

      <h2 className="text-xl font-semibold mb-4">
        Research Report
      </h2>

      <div className="whitespace-pre-wrap break-words">
        {report}
      </div>

    </div>
  );
}

export default ReportView;