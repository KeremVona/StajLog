import { useEffect, type SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import useFormData from "../hooks/useFormData";
import { getLogs, makeLog } from "../features/log/logActions";
import { LogStatus } from "../interfaces/log/Log";

const MakeLog = () => {
  const { formData, handleInputChange } = useFormData({
    internshipId: 0,
    logDate: new Date().getDate(),
    content: "",
    status: LogStatus.DRAFT,
    startDate: new Date(),
    endDate: new Date(),
  });

  const { loading, error, logInfo } = useAppSelector((state) => state.log);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      logDate: new Date(formData.logDate),
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    };

    dispatch(makeLog(payload)).unwrap();

    setTimeout(() => {
      console.log("Sending you back...");
      <Navigate to="/internships/1" />;
    }, 800);
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(logInfo.length);
  };

  useEffect(() => {
    dispatch(getLogs());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar Navigation (Maintained for consistency) */}
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="/internships"
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
              <p className="text-sm font-medium text-zinc-900">Kerem Can Baş</p>
              <p className="text-xs text-zinc-500">
                Fatih Sultan Mehmet Vakıf Üni.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Centered for focus */}
      <main className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col">
          {/* Breadcrumbs & Header */}
          <div className="mb-6">
            <nav className="flex items-center text-sm font-medium text-zinc-500 mb-4">
              <a
                href="/internships"
                className="hover:text-zinc-900 transition-colors"
              >
                Internships
              </a>
              <svg
                className="mx-2 h-4 w-4 text-zinc-400"
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
              <a
                href="/internships/1"
                className="hover:text-zinc-900 transition-colors"
              >
                OBSS
              </a>
              <svg
                className="mx-2 h-4 w-4 text-zinc-400"
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
              <span className="text-zinc-900">New Log</span>
            </nav>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
                  Day {logInfo.length + 1} Log
                </h1>
                <p className="mt-1 text-sm text-zinc-500">July 3, 2026</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
                Draft
              </span>
            </div>
          </div>

          {/* Editor Container */}
          <div className="flex-1 flex flex-col rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden mb-6 relative group">
            {/* Writing Area */}
            <div className="flex-1 p-8">
              <textarea
                placeholder="What did you work on today? Don't worry about perfect grammar, the AI will help you polish it..."
                className="w-full h-full min-h-[400px] resize-none border-none p-0 text-base leading-relaxed text-zinc-800 placeholder-zinc-400 focus:ring-0 bg-transparent outline-none"
                defaultValue=""
              />
            </div>

            {/* AI Action Bar - Placed contextually inside the editor card */}
            <div className="border-t border-zinc-100 bg-zinc-50/50 p-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-zinc-500">
                <svg
                  className="mr-2 h-4 w-4 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Write roughly, then improve it for the official document.
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 14.2V8.9L16.4 4.3H4C2.9 4.3 2 5.2 2 6.3V18.3C2 19.4 2.9 20.3 4 20.3H14.2V14.2H21ZM14 13V19L20 13H14Z" />
                </svg>
                Improve with AI
              </button>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              className="text-sm font-medium text-zinc-500 hover:text-rose-600 transition-colors"
            >
              Delete Log
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save as Draft
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
              >
                <svg
                  className="-ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MakeLog;
