export enum LogStatus {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
}

export interface MakeLogBody {
  internshipId: number;
  logDate: Date | string;
  content: string;
  improvedContent: string;
  isImproved: boolean;
  status?: LogStatus;
}

export interface LogParams {
  id: string;
}
