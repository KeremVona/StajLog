export interface LogTemplateContext {
  student_name: string;
  student_id: string;
  national_id: string;
  email: string;
  phone_number: string;
  university_name: string;
  company_name: string;
  company_sector: string;
  company_address: string;
  company_phone: string;
  start_date: string;
  end_date: string;
  logs: Array<{
    day_number: number;
    date: string;
    description: string;
  }>;
}
