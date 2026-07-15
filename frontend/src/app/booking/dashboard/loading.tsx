export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 w-64 rounded-lg bg-[#EDE6D8] animate-pulse" />
            <div className="h-4 w-40 rounded bg-[#EDE6D8] animate-pulse" />
          </div>
          <div className="h-10 w-36 rounded-xl bg-[#EDE6D8] animate-pulse" />
        </div>

        {/* Filters / action bar skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-48 rounded-xl bg-[#EDE6D8] animate-pulse" />
          <div className="h-10 w-32 rounded-xl bg-[#EDE6D8] animate-pulse" />
          <div className="h-10 w-28 rounded-xl bg-[#EDE6D8] animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-2xl border border-[#EDE6D8] bg-white overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-8 gap-4 px-6 py-4 bg-[#F7F3EC]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="h-4 rounded bg-[#EDE6D8] animate-pulse"
              />
            ))}
          </div>

          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, row) => (
            <div
              key={`r-${row}`}
              className="grid grid-cols-8 gap-4 px-6 py-5 border-t border-[#EDE6D8]/60"
            >
              {Array.from({ length: 8 }).map((_, col) => (
                <div
                  key={`c-${row}-${col}`}
                  className={`h-4 rounded bg-[#EDE6D8] animate-pulse ${
                    col === 0 ? "w-3/4" : col === 7 ? "w-1/2 mx-auto" : ""
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
