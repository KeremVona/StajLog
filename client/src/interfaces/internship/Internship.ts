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

export interface InternsipParams {
  id: string;
}

export interface EditInternshipThunkArgs {
  id: number;
  data: EditInternshipBody;
}
