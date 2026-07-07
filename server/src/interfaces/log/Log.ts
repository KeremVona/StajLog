export enum LogStatus {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED"
}

export interface MakeLogBody {
  internshipId: number;
  logDate: Date | string;
  content: string;
  status?: LogStatus;
}
