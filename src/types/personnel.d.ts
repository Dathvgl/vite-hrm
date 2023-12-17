export type PersonnelType = {
  id: string;
  fullname: string;
  position: string;
  department: string;
  phone: string;
  birth: string;
  address: string;
  email: string;
  roles: PersonnelRoleType[];
  companies: string[];
};

export type PersonnelRoleType = "staff" | "manager" | "admin" | "boss";
