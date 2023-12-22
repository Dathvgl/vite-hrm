export type DepartmentType = {
  id: string;
  stt: number;
  name: string;
  description: string;
};

export type DepartmentsGetType = DepartmentType & {
  createdAt: number;
  updatedAt: number;
};

export type DepartmentAllGetType = Pick<DepartmentType, "id" | "stt" | "name">;
export type DepartmentPostType = Omit<DepartmentType, "id" | "stt">;
