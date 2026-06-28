import { type Request } from "express";

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
  internshipId: number;
}

export interface AuthInternshipRequest extends Request<
  {},
  {},
  MakeInternshipBody
> {
  user?: { id: number };
}
