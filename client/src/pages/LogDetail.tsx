import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Sidebar from "../components/layout/Sidebar";
import { getInternshipById } from "../features/internship/internshipActions";
import {
  deleteLog,
  editLog,
  getLogById,
  getLogs,
} from "../features/log/logActions";
import useFormData from "../hooks/useFormData";
import { LogStatus } from "../interfaces/log/Log";

const LogDetail = () => {
  const { formData, handleInputChange, setFormData } = useFormData({
    internshipId: 0,
    logDate: new Date().toISOString(),
    content: "",
    status: LogStatus.DRAFT,
  });

  const navigate = useNavigate();

  const { loading, error, logInfo } = useAppSelector((state) => state.log);

  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const { logId } = useParams<{ logId: string }>();
  const numberId = Number(id);
  const numberLogId = Number(logId);

  const { internshipInfo } = useAppSelector((state) => state.internship);

  useEffect(() => {
    if (!internshipInfo || internshipInfo.length === 0) {
      dispatch(getInternshipById({ internshipId: numberId }));
    }
  }, [dispatch, numberId, internshipInfo]);

  useEffect(() => {
    if (logInfo && logInfo.length > 0) {
      const currentLog = logInfo[0];
      setFormData((prev: any) => ({
        ...prev,
        content: currentLog.content || "",
        logDate: currentLog.logDate || prev.logDate,
        status: currentLog.status || prev.status,
      }));
    }
  }, [logInfo, setFormData]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      internshipId: numberId,
      logDate: formData.logDate,
    };

    dispatch(editLog({ logId: numberLogId, data: payload })).unwrap();
  };

  const handleDelete = () => {
    dispatch(deleteLog({ logId: numberLogId }));
    console.log("Sending you back...");
    setTimeout(() => {
      navigate(`/internships/${numberId}`);
    }, 800);
  };

  useEffect(() => {
    dispatch(getLogById({ logId: numberLogId }));
  }, [dispatch, numberLogId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar Navigation (Maintained for consistency) */}
      <Sidebar />
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
                href={`/internships/${internshipInfo?.[0]?.id}`}
                className="hover:text-zinc-900 transition-colors"
              >
                {internshipInfo?.[0]?.companyName || "Loading..."}
              </a>{" "}
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
                  Day x Log
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
                value={formData.content}
                name="content"
                onChange={handleInputChange}
                placeholder="What did you work on today? Don't worry about perfect grammar, the AI will help you polish it..."
                className="w-full h-full min-h-[400px] resize-none border-none p-0 text-base leading-relaxed text-zinc-800 placeholder-zinc-400 focus:ring-0 bg-transparent outline-none"
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
              onClick={handleDelete}
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
                Update and Save as Draft
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

export default LogDetail;
