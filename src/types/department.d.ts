export type DepartmentType = {
  id: string;
  stt: number;
  name: string;
  salary?: string;
  description: string;
};

export type DepartmentsGetType = DepartmentType & {
  createdAt: number;
  updatedAt: number;
};

export type DepartmentAllGetType = Pick<DepartmentType, "id" | "stt" | "name">;
export type DepartmentPostType = Omit<DepartmentType, "id" | "stt">;
export type DepartmentPutType = Partial<DepartmentPostType>;
