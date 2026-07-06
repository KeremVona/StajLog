import Sidebar from "../components/layout/Sidebar"
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { makeInternship } from "../features/internship/internshipActions";
import useFormData from "../hooks/useFormData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MakeInternship = () => {
  const { formData, handleInputChange } = useFormData({
    userId: 0,
    companyName: "",
    companySector: "",
    companyAddress: "",
    companyPhone: "",
    companyWebAddress: "",
    startDate: new Date,
    endDate: new Date,
  });
  const { loading, error, success } = useAppSelector((state) => state.internship);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    };

    try {
      await dispatch(makeInternship(payload)).unwrap();
    } catch (error) {
      alert("Error occured");
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/internships")
      }, 400);
    }
  }, [success])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  return (
    <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Sidebar Navigation (Maintained for consistency) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Breadcrumbs & Header */}
          <div className="mb-8">
            <nav className="flex items-center text-sm font-medium text-zinc-500 mb-2">
              <a href="/internships" className="hover:text-zinc-900 transition-colors">Internships</a>
              <svg className="mx-2 h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-zinc-900">New</span>
            </nav>

            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Make New Internship</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Fill in the company details. This information will be used to automatically generate your university documents.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="divide-y divide-zinc-200">

              {/* Section 1: Company Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-base font-semibold leading-6 text-zinc-900">Company Details</h2>
                  <p className="mt-1 text-sm text-zinc-500">The official information of the workplace.</p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">

                  {/* Company Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="company_name" className="block text-sm font-medium text-zinc-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      id="company_name"
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Company"
                      className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                    />
                  </div>

                  {/* Sector */}
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-zinc-700 mb-1">
                      Sector / Industry
                    </label>
                    <input
                      type="text"
                      name="companySector"
                      id="sector"
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Software Engineering"
                      className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                    />
                  </div>

                  {/* Company Phone */}
                  <div>
                    <label htmlFor="company_phone" className="block text-sm font-medium text-zinc-700 mb-1">
                      Company Phone
                    </label>
                    <input
                      type="tel"
                      name="companyPhone"
                      id="company_phone"
                      onChange={handleInputChange}
                      placeholder="+90 216 000 00 00"
                      className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                    />
                  </div>

                  {/* Web Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="web_address" className="block text-sm font-medium text-zinc-700 mb-1">
                      Web Address
                    </label>
                    <div className="flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-zinc-300 bg-zinc-50 px-3 text-zinc-500 sm:text-sm">
                        https://
                      </span>
                      <input
                        type="text"
                        name="companyWebAddress"
                        id="web_address"
                        onChange={handleInputChange}
                        placeholder="www.company.com"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="company_address" className="block text-sm font-medium text-zinc-700 mb-1">
                      Full Address
                    </label>
                    <input
                      id="company_address"
                      name="companyAddress"
                      onChange={handleInputChange}
                      required
                      placeholder="Address"
                      className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Timeline */}
              <div className="p-6 sm:p-8 space-y-6 bg-zinc-50/50">
                <div>
                  <h2 className="text-base font-semibold leading-6 text-zinc-900">Internship Timeline</h2>
                  <p className="mt-1 text-sm text-zinc-500">Defines how many daily logs will be required.</p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {/* Start Date */}
                  <div>
                    <label htmlFor="start_date" className="block text-sm font-medium text-zinc-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="start_date"
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label htmlFor="end_date" className="block text-sm font-medium text-zinc-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="end_date"
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-x-4 px-6 py-4 sm:px-8 bg-zinc-50">
                <button
                  type="button"
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  Make Internship
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  )
}

export default MakeInternship
