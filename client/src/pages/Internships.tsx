import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Sidebar from "../components/layout/Sidebar";
import { getInternships } from "../features/internship/internshipActions";

const Internships = () => {
  const { loading, error, internshipInfo } = useAppSelector(
    (state) => state.internship,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (internshipInfo.length === 0) {
      dispatch(getInternships());
    }
  }, [dispatch, internshipInfo.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
                Internships
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                Choose an internship to write logs or generate documents.
              </p>
            </div>
            <div>
              <button className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <svg
                  className="-ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                New Internship
              </button>
            </div>
          </div>

          {/* Internships Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {/* Card 1: Active Internship */}
            {internshipInfo.map((internship) => (
              <div key={internship.id}>
                <a
                  href={`/internships/${internship.id}`}
                  className="group block rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                        {internship.companyName}
                      </h2>
                      <p className="text-sm text-zinc-500">
                        {internship.companySector}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      In Progress
                    </span>
                  </div>

                  <div className="mb-6 flex items-center text-sm text-zinc-500 gap-4">
                    <div className="flex items-center gap-1.5">
                      <svg
                        className="h-4 w-4 text-zinc-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(internship.startDate).toLocaleString()} -
                        {new Date(internship.endDate).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm text-zinc-600 mb-2">
                      <span className="font-medium">Logs Progress</span>
                      <span>14 / 30</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: "46%" }}
                      ></div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Internships;
