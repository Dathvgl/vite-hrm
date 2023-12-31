export type PositionType = {
  id: string;
  stt: number;
  department: string;
  name: string;
  salary: number;
  allowance?: number;
};

export type PositionsGetType = {
  createdAt: number;
  updatedAt: number;
} & PositionType;

export type PositionAllGetType = Pick<PositionType, "id" | "stt" | "name">;
export type PositionPostType = Omit<PositionType, "id" | "stt">;
