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
  id: string;
}

export interface AuthInternshipRequest extends Request<
  {},
  {},
  MakeInternshipBody
> {
  user?: { id: number };
}

export interface AuthRequest<P, B> extends Request<P, {}, B> {
  user?: { id: number };
}

export interface AuthRequest2<P> extends Request<P, {}, {}> {
  user?: { id: number };
}
