import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { CompanyType } from "~/types/company";
import { storeFB } from "~/utils/firebase";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getCompanies: builder.query<CompanyType[], void>({
      queryFn: async () => {
        try {
          const data: CompanyType[] = [];

          const querySnapshot = await getDocs(collection(storeFB, "companies"));
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as CompanyType);
          });

          return { data };
        } catch (error) {
          return { error: "Lỗi get companies" };
        }
      },
    }),
    postCompany: builder.mutation<string, CompanyType>({
      queryFn: async (arg) => {
        try {
          await addDoc(collection(storeFB, "companies"), arg);
          return { data: "Tạo thành công" };
        } catch (error) {
          return { error: "Lỗi post company" };
        }
      },
    }),
  }),
});

export const { useGetCompaniesQuery, usePostCompanyMutation } = companyApi;
