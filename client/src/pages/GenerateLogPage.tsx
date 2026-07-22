import Sidebar from "../components/layout/Sidebar";

export default function GenerateLogPage() {
  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900 relative">
      {/* Sidebar Navigation (Maintained for consistency) */}
      <Sidebar />

      {/* Main Content Area (Showing the Empty State in the background) */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Export Logs
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Compile your daily entries into official university formats.
              </p>
            </div>
            <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors">
              Export Internship Log
            </button>
          </div>

          {/* Empty State UI (Visible if 0 logs exist) */}
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-sm font-semibold text-zinc-900">
              No logs generated yet
            </h3>
            <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">
              Get started by writing your first daily entry. Once you have logs,
              you can export them into your university's official template.
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors"
              >
                <svg
                  className="-ml-1 mr-2 h-4 w-4 text-zinc-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Day 1 Log
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================= */}
      {/* EXPORT MODAL OVERLAY (The Core Hand-off)  */}
      {/* ========================================= */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
        <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl ring-1 ring-zinc-200 overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="border-b border-zinc-100 px-6 py-5 flex items-center justify-between bg-zinc-50/50">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Export Logs
              </h2>
              <p className="text-sm text-zinc-500 mt-0.5">
                Configure your document options
              </p>
            </div>
            <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-6 py-5 space-y-6">
            {/* Template Selection */}
            <div>
              <label
                htmlFor="template"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                University Template
              </label>
              <select
                id="template"
                name="template"
                className="block w-full rounded-md border border-zinc-300 py-2 pl-3 pr-10 text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm bg-white"
              >
                <option>
                  Fatih Sultan Mehmet Vakıf Üni. Standard Log (.docx)
                </option>
                <option>Generic Log Template (.docx)</option>
              </select>
            </div>

            {/* Text Source Selection */}
            <div>
              <span className="block text-sm font-medium text-zinc-700 mb-2">
                Text Source
              </span>
              <div className="flex gap-4">
                <label className="flex items-center p-3 border border-zinc-200 rounded-lg cursor-pointer hover:bg-zinc-50 flex-1 transition-colors">
                  <input
                    type="radio"
                    name="textSource"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                    defaultChecked
                  />
                  <span className="ml-3 block text-sm font-medium text-zinc-900">
                    Use AI Improved
                    <span className="block text-xs text-zinc-500 font-normal mt-0.5">
                      Polished and professional
                    </span>
                  </span>
                </label>
                <label className="flex items-center p-3 border border-zinc-200 rounded-lg cursor-pointer hover:bg-zinc-50 flex-1 transition-colors">
                  <input
                    type="radio"
                    name="textSource"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300"
                  />
                  <span className="ml-3 block text-sm font-medium text-zinc-900">
                    Use Raw Text
                    <span className="block text-xs text-zinc-500 font-normal mt-0.5">
                      Exactly as you wrote it
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {/* Date Range Selection */}
            <div>
              <label
                htmlFor="date_range"
                className="block text-sm font-medium text-zinc-700 mb-1"
              >
                Date Range
              </label>
              <select
                id="date_range"
                name="date_range"
                className="block w-full rounded-md border border-zinc-300 py-2 pl-3 pr-10 text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm bg-white"
              >
                <option>Entire Internship (30 Days)</option>
                <option>First Half (Days 1-15)</option>
                <option>Custom Range...</option>
              </select>
            </div>

            {/* Warnings Container */}
            <div className="space-y-3">
              {/* Missing Fields Warning */}
              <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-amber-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">
                      Missing Information
                    </h3>
                    <div className="mt-1 text-sm text-amber-700">
                      <p>
                        Your profile is missing <strong>Student ID</strong>. It
                        will appear blank on the final document.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Incomplete Logs Warning */}
              <div className="rounded-md bg-rose-50 p-4 border border-rose-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-rose-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-rose-800">
                      Incomplete Logs
                    </h3>
                    <div className="mt-1 text-sm text-rose-700">
                      <p>
                        5 days are still marked as <strong>Draft</strong>. They
                        will be exported in their current state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="bg-zinc-50 border-t border-zinc-100 px-6 py-4 flex items-center justify-between sm:flex-row flex-col-reverse gap-3">
            <button
              type="button"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors w-full sm:w-auto text-center"
            >
              Cancel
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-300 hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Download PDF
              </button>

              {/* Example of Loading State styling (can be toggled based on state) */}
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {/* Loader icon (hidden normally, visible when compiling) */}
                {/* <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> */}
                Download DOCX
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
