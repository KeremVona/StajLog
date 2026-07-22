import type { LogTemplateContext } from "#/interfaces/document/LogTemplateContext.js";

export function buildTemplateContext(
  user: any,
  university: any,
  internship: any,
  logs: any[],
  useImprovedText: boolean = true,
): LogTemplateContext {
  const FALLBACK = "_______________________";

  return {
    student_name: user.fullName || FALLBACK,
    student_id: user.studentId || FALLBACK,
    national_id: user.nationalId || FALLBACK,
    email: user.email || FALLBACK,
    phone_number: user.phoneNumber || "N/A",
    university_name: university?.name || FALLBACK,

    company_name: internship.companyName || FALLBACK,
    company_sector: internship.companySector || "N/A",
    company_address: internship.companyAddress || "N/A",
    company_phone: internship.companyPhone || "N/A",

    start_date: formatDate(internship.startDate),
    end_date: formatDate(internship.endDate),

    logs: logs.map((log, index) => ({
      day_number: index + 1,
      date: formatDate(log.logDate),
      description:
        useImprovedText && log.improvedContent
          ? log.improvedContent
          : log.content || "",
    })),
  };
}

function formatDate(date: Date | string): string {
  if (!date) return "_______________________";
  const d = new Date(date);
  return d.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
