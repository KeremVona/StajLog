import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getLogs } from "../../features/log/logActions";

const Logs = () => {
  const { loading, error, logInfo } = useAppSelector((state) => state.log);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLogs());
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!logInfo || logInfo.length === 0) {
    return <div>No log details found.</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-zinc-900">Daily Logs</h2>
      {logInfo.map((log) => (
        <div
          key={log.id}
          className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 shadow-sm relative overflow-hidden group cursor-pointer hover:border-indigo-300 transition-colors"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-zinc-900">Day 15 Log</h3>
            {log.status === "DRAFT" && (
              <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                Draft in progress
              </span>
            )}
            {log.status === "COMPLETED" && (
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                Completed
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-600 line-clamp-2">{log.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Logs;
