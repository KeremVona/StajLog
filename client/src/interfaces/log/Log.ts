export interface LogData {
  id: number;
  internshipId: number;
  logDate: Date | string;
  content: string;
  improvedContent: string;
  isImproved: boolean;
  status?: LogStatus;
  madeAt: Date;
  updatedAt: Date;
}

export interface EditLogThunkArgs {
  logId: number;
  data: MakeLogBody;
}

export interface LogState {
  loading: boolean;
  logInfo: LogData[];
  error: string | null;
  success: boolean;
}

export const LogStatus = {
  DRAFT: "DRAFT",
  COMPLETED: "COMPLETED",
} as const;

export interface MakeLogBody {
  internshipId: number;
  logDate: Date | string;
  content: string;
  status?: LogStatus;
}

export interface LogParams {
  id: string;
}

export type LogStatus = (typeof LogStatus)[keyof typeof LogStatus];
