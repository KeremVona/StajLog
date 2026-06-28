const Dashboard = () => {
  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 border-r border-zinc-200 bg-zinc-50/50 hidden md:flex md:flex-col">
        <div className="flex h-16 items-center px-6 border-b border-zinc-200">
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            StajLog
          </span>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            <a
              href="/dashboard"
              className="flex items-center rounded-md bg-zinc-200/50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="/internships"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Internships
            </a>
            <a
              href="/documents"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <svg
                className="mr-3 h-5 w-5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Documents
            </a>
          </nav>
        </div>
        <div className="border-t border-zinc-200 p-4">
          <div className="flex items-center group cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-medium border border-indigo-200">
              KB
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-zinc-900">Full name</p>
              <p className="text-xs text-zinc-500">University name</p>
            </div>
          </div>
        </div>
      </aside>

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
              <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors">
                Generate Forms
              </button>
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
                    Company name
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">Role • Location </p>
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
                        Day 14 Log
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
