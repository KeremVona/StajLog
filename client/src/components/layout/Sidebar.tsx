const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-zinc-200 bg-zinc-50/50 hidden md:flex md:flex-col">
      <div className="flex h-16 items-center px-6 border-b border-zinc-200">
        <span className="text-lg font-semibold tracking-tight text-zinc-900">
          StajLog
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          <a
            href="/home"
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
            FN
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-zinc-900">Full name</p>
            <p className="text-xs text-zinc-500">University name</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
