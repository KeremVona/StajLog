import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Sidebar from "../components/layout/Sidebar";
import { getInternships } from "../features/internship/internshipActions";
import { getLogs } from "../features/log/logActions";
import { useParams, useNavigate } from "react-router";
import type { LogData } from "../interfaces/log/Log";

const Dashboard = () => {
  const { internshipInfo, error, loading } = useAppSelector(
    (state) => state.internship,
  );

  const { logInfo } = useAppSelector((state) => state.log);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (internshipInfo.length === 0) {
      dispatch(getInternships()).unwrap();
    }
    if (logInfo.length === 0) {
      dispatch(getLogs()).unwrap();
    }
  }, [dispatch, internshipInfo.length]);

  let logs: (LogData & { dayNumber: number })[] = [];

  const [currentPage, setCurrentPage] = useState(1);

  const sortedLogs = [...logInfo].sort((a, b) => {
    const timeDiff =
      new Date(a.logDate).getTime() - new Date(b.logDate).getTime();

    // If dates are exactly the same, fallback to sorting by ID
    // so the order remains consistent even after updates
    if (timeDiff === 0) {
      return a.id - b.id;
    }

    return timeDiff;
  });

  if (sortedLogs) {
    logs = sortedLogs.map((log, index) => ({
      ...log,
      dayNumber: index + 1,
    }));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!internshipInfo || internshipInfo.length === 0) {
    return <div>No internship details found.</div>;
  }

  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Overview
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Manage your daily logs and university documents.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/make-internship"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors"
              >
                Make New Internship
              </a>
              <button className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
                Write Today's Log
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Active Internship Card (Takes up 2 columns on large screens) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                    Active Internship
                  </h2>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                    In Progress
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {internshipInfo[0].companyName}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    {internshipInfo[0].companySector} •{" "}
                    {internshipInfo[0].companyAddress}{" "}
                  </p>
                </div>

                {/* Progress Bar Area */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-sm text-zinc-600 mb-2">
                    <span>Logs Completed</span>
                    <span className="font-medium text-zinc-900">
                      14 / 30 Days
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "46%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Logs List */}
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
                <div className="border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-zinc-900">
                    Recent Logs
                  </h2>
                  <a
                    href="/logs"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                  </a>
                </div>
                <ul className="divide-y divide-zinc-100">
                  {/* Log Item - Completed & Improved */}
                  <li className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">
                        {logInfo[logInfo.length - 1].id}
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5">
                        Updated 2 hours ago
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                        AI Improved
                      </span>
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                        Completed
                      </span>
                      <svg
                        className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </li>

                  {/* Log Item - Draft */}
                  <li className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors group cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-zinc-900">
                        Day 15 Log
                      </span>
                      <span className="text-xs text-zinc-500 mt-0.5">
                        Made just now
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                        Draft
                      </span>
                      <svg
                        className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Documents & Actions */}
            <div className="space-y-6">
              {/* Document Templates Card */}
              <div className="rounded-xl border border-zinc-200 bg-white shadow-sm p-6">
                <h2 className="text-base font-semibold text-zinc-900 mb-4">
                  Required Documents
                </h2>
                <div className="space-y-3">
                  <div className="group rounded-lg border border-zinc-200 p-3 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-start">
                      <svg
                        className="h-6 w-6 text-indigo-500 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-zinc-900">
                          Application Form
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          University Template
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-lg border border-zinc-200 p-3 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-start">
                      <svg
                        className="h-6 w-6 text-indigo-500 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-zinc-900">
                          Acceptance Form
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          University Template
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick AI Action Card */}
              <div className="rounded-xl bg-gradient-to-br from-indigo-900 to-indigo-800 shadow-sm p-6 text-white">
                <h2 className="text-base font-semibold mb-2">
                  Ready to export?
                </h2>
                <p className="text-sm text-indigo-200 mb-4 leading-relaxed">
                  Once your 30 logs are completed and improved, you can compile
                  them directly into the university log summary template.
                </p>
                <button className="w-full inline-flex justify-center items-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-colors">
                  View Export Options
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
