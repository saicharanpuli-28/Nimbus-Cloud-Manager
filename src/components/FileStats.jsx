function FileStats({ title, value, color }) {
  return (
    <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2
        className="text-3xl font-bold mt-2"
        style={{ color }}
      >
        {value}
      </h2>

    </div>
  );
}

export default FileStats;