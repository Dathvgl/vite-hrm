export type VacationType = {
  id: string;
  stt: number;
  personnel: string;
  offDays: string[];
  reason: string;
  status: VacationStatusType;
};

export type VacationStatusType = "pending" | "accept" | "refuse";

export type VacationsGetType = {
  createdAt: number;
  updatedAt: number;
} & VacationType;

export type VacationAllGetType = Pick<VacationType, "id" | "stt" | "name">;
export type VacationPostType = Omit<VacationType, "id" | "stt" | "status">;
