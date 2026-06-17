

function SourceList({ sources }) {

  if (!sources.length) return null;

  return (
    <div className="mt-6">

      <h2 className="text-xl font-semibold mb-4">
        Sources
      </h2>

      <div className="grid gap-4">

        {sources.map((source, index) => (

          <div
            key={index}
            className="bg-slate-900 p-4 rounded-xl"
          >

            <h3 className="font-semibold">
              {source.title}
            </h3>

            <p className="text-slate-400">
              {source.content?.slice(0,150)}
            </p>

            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400"
            >
              View Source →
            </a>

          </div>

        ))}

      </div>

    </div>
  );
}

export default SourceList;