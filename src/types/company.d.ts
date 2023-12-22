export type CompanyType = {
  id: string;
  stt: number;
  code: string;
  name: string;
  address: string;
  constructionYear: string;
  operationYear: string;
};

export type CompaniesGetType = CompanyType & {
  createdAt: number;
  updatedAt: number;
};

export type CompanyAllGetType = Pick<CompanyType, "id" | "stt" | "name">;
export type CompanyPostType = Omit<CompanyType, "id" | "stt">;
