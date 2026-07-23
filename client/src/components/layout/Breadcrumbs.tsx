import type { InternshipData } from "../../interfaces/internship/Internship";

interface BreadcrumbsProps {
  internshipInfo: InternshipData[];
}

const Breadcrumbs = ({ internshipInfo }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center text-sm font-medium text-zinc-500 mb-2">
      <a href="/internships" className="hover:text-zinc-900 transition-colors">
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
      <span className="text-zinc-900">{internshipInfo[0].companyName}</span>
    </nav>
  );
};

export default Breadcrumbs;
