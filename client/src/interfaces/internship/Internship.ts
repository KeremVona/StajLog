export interface MakeInternshipBody {
  userId: number;
  companyName: string;
  companySector: string;
  companyAddress: string;
  companyPhone: string;
  companyWebAddress: string;
  startDate: Date;
  endDate: Date;
}

export interface EditInternshipBody {
  companyName: string;
  companySector: string;
  companyAddress: string;
  companyPhone: string;
  companyWebAddress: string;
  startDate: Date;
  endDate: Date;
}

export interface InternshipData {
  id: number;
  userId: number;
  companyName: string;
  companySector: string;
  companyAddress: string;
  companyPhone: string;
  companyWebAddress: string;
  startDate: Date;
  endDate: Date;
  madeAt: Date;
  updatedAt: Date;
}

export interface InternsipParams {
  id: string;
}

export interface EditInternshipThunkArgs {
  id: number;
  data: EditInternshipBody;
}

export interface InternshipState {
  loading: boolean;
  internshipInfo: InternshipData[];
  error: string | null;
  success: boolean;
}
