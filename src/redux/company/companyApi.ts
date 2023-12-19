import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { CompanyType } from "~/types/company";
import { storeFB } from "~/utils/firebase";

export const companyApi = createApi({
  reducerPath: "companyApi",
  tagTypes: ["Companies"],
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
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "Companies" as const, id })),
            { type: "Companies" as const, id: "LIST" },
          ];
        } else return [{ type: "Companies" as const, id: "LIST" }];
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
      invalidatesTags: () => [{ type: "Companies", id: "LIST" }],
    }),
    deleteCompany: builder.mutation<string, string>({
      queryFn: async (arg) => {
        try {
          const querySnapshot = await getDocs(
            query(
              collection(storeFB, "personnels"),
              where("companies", "array-contains", arg)
            )
          );

          for (const item of querySnapshot.docs) {
            await updateDoc(doc(storeFB, "personnels", item.id), {
              companies: arrayRemove(arg),
            });
          }

          await deleteDoc(doc(storeFB, "companies", arg));
          return { data: "Xóa thành công" };
        } catch (error) {
          return { error: "Lỗi delete company" };
        }
      },
      invalidatesTags: (_, __, id) => [{ type: "Companies", id }],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  usePostCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
