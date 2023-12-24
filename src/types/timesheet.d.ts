export type TimesheetType = {
  id: string;
  stt: number;
  personnel: string;
  year: number;
  month: number;
  days: number[];
};

export type TimesheetsGetType = {
  createdAt: number;
  updatedAt: number;
} & TimesheetType;

export type TimesheetTimeGetType = Pick<TimesheetType, "id" | "days">;
export type TimesheetPostType = Omit<TimesheetType, "id" | "stt">;
