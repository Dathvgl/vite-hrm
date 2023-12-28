import { SalaryTypeType } from "./salary";

export type PersonnelType = {
  id: string;
  stt: number;
  name: string;
  position: string;
  department: string;
  phone: string;
  birth: string;
  address: string;
  email: string;
  roles: PersonnelRoleType[];
  company: string;
};

export type PersonnelRoleType = "staff" | "manager" | "admin" | "boss";

export type PersonnelsGetManagement = {
  createdAt: number;
  updatedAt: number;
} & Omit<PersonnelType, "salary" | "roles">;

export type PersonnelsGetCompany = {
  createdAt: number;
  updatedAt: number;
} & Pick<PersonnelType, "id" | "stt" | "name" | "email" | "company">;

export type PersonnelsGetRoles = {
  createdAt: number;
  updatedAt: number;
} & Pick<PersonnelType, "id" | "stt" | "name" | "roles">;

export type PersonnelAllGetType = Pick<PersonnelType, "id" | "stt" | "name">;

export type PersonnelRoleType = "staff" | "manager" | "admin" | "boss";

export type PersonnelCurrentType = Pick<
  PersonnelType,
  "id" | "name" | "email" | "roles"
>;

export type PersonnelOneType = Pick<
  PersonnelType,
  "id" | "name" | "email" | "department" | "position" | "company"
> & { salary?: number; salaryType?: SalaryTypeType };

export type PersonnelPostType = Omit<
  PersonnelType,
  "id" | "stt" | "company" | "roles"
>;
