import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Sidebar from "../components/layout/Sidebar";
import {
  deleteInternship,
  getInternshipById,
} from "../features/internship/internshipActions";
import { Link, useParams } from "react-router-dom";
import Logs from "../components/log/Logs";

const InternshipDetail = () => {
  const { loading, error, internshipInfo } = useAppSelector(
    (state) => state.internship,
  );
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const numberId = Number(id);

  useEffect(() => {
    if (internshipInfo.length === 0) {
      dispatch(getInternshipById({ internshipId: Number(id) }));
    }
  }, [dispatch, internshipInfo.length]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!internshipInfo || internshipInfo.length === 0) {
    return <div>No internship details found.</div>;
  }
  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar Navigation (Maintained for consistency) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Header */}
          <div className="mb-8">
            <nav className="flex items-center text-sm font-medium text-zinc-500 mb-2">
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
              <span className="text-zinc-900">
                {internshipInfo[0].companyName}
              </span>
            </nav>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  {internshipInfo[0].companyName}
                </h1>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 mt-1">
                  In Progress
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    dispatch(
                      deleteInternship({ internshipId: numberId }),
                    ).unwrap()
                  }
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors"
                >
                  Delete Internship
                </button>
                <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors">
                  Edit Details
                </button>
                <Link
                  to={`/internships/${numberId}/make-log`}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  New Log Entry
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column: Log Workflow (Part 1) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Summary */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Log Completion Requirement
                  </p>
                  <p className="text-2xl font-semibold text-zinc-900 mt-1">
                    14{" "}
                    <span className="text-base text-zinc-500 font-normal">
                      / 30 Days
                    </span>
                  </p>
                </div>
                <div className="w-1/2">
                  <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: "46%" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-zinc-500 mt-2">
                    <span>Day 1</span>
                    <span>Day 30 Export Ready</span>
                  </div>
                </div>
              </div>

              {/* Log Entries List */}
              <Logs id={internshipInfo[0].id} />
            </div>

            {/* Right Column: Metadata & Documents (Part 2) */}
            <div className="space-y-6">
              {/* Company Info Card */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-zinc-900 mb-4 flex items-center justify-between">
                  Internship Details
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Sector
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-900">
                      {internshipInfo[0].companySector}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-900">
                      {new Date(internshipInfo[0].startDate).toLocaleString()} -
                      {new Date(
                        internshipInfo[0].endDate,
                      ).toLocaleString()}{" "}
                    </dd>
                  </div>
                  <div className="pt-4 border-t border-zinc-100">
                    <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-zinc-900">
                      {internshipInfo[0].companyAddress}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Website
                    </dt>
                    <dd className="mt-1 text-sm text-indigo-600 hover:underline cursor-pointer">
                      {internshipInfo[0].companyWebAddress}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Document Generation Card */}
              <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-zinc-900 mb-1">
                  Generate Documents
                </h2>
                <p className="text-xs text-zinc-500 mb-4">
                  Select a template to auto-fill your details.
                </p>

                <div className="space-y-3">
                  <button className="w-full group flex items-center justify-between rounded-lg border border-zinc-200 p-3 hover:border-indigo-300 hover:bg-zinc-50 transition-all text-left">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-indigo-500 mr-3"
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
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          Application Form
                        </p>
                        <p className="text-xs text-zinc-500">
                          Requires missing ID info
                        </p>
                      </div>
                    </div>
                    <svg
                      className="h-4 w-4 text-zinc-400 group-hover:text-indigo-500"
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
                  </button>

                  <button className="w-full group flex items-center justify-between rounded-lg border border-zinc-200 p-3 hover:border-indigo-300 hover:bg-zinc-50 transition-all text-left">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-indigo-500 mr-3"
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
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          Acceptance Form
                        </p>
                        <p className="text-xs text-emerald-600">
                          All data present
                        </p>
                      </div>
                    </div>
                    <svg
                      className="h-4 w-4 text-zinc-400 group-hover:text-indigo-500"
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
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InternshipDetail;
