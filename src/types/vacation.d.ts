export type VacationType = {
  id: string;
  personnelId: string;
  offDays: number;
  reason: string;
  status: VacationStatusType;
};

export type VacationStatusType = "pending" | "accept" | "refuse";
