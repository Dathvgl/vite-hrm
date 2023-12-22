import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { PersonnelType } from "~/types/personnel";
import { envs } from "~/utils/env";
import { authFB, storeFB } from "~/utils/firebase";
import { PersonnelTransferType } from "./personnelSlice";

export const personnelApi = createApi({
  reducerPath: "personnelApi",
  tagTypes: ["Personnels"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
  }),
  endpoints: (builder) => ({
    getPersonnels: builder.query<PersonnelType[], void>({
      query: (arg) => `/personnel?page=${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "Personnels" as const, id })),
            { type: "Personnels" as const, id: "LIST" },
          ];
        } else return [{ type: "Personnels" as const, id: "LIST" }];
      },
    }),
    getPersonnel: builder.query<PersonnelType | null, string>({
      query: (arg) => `/personnel/${arg}`,
      providesTags: (result) => {
        if (result) {
          return [{ type: "Personnels" as const, id: result.id }];
        } else return [{ type: "Personnels" as const, id: "LIST" }];
      },
    }),
    postPersonnel: builder.mutation<string, PersonnelType>({
      queryFn: async (arg) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            authFB,
            arg.email,
            "123456"
          );

          await setDoc(
            doc(storeFB, "personnels", userCredential.user.uid),
            arg,
            { merge: true }
          );
          return { data: "Tạo thành công" };
        } catch (error) {
          return { error: "Lỗi post personnel" };
        }
      },
      invalidatesTags: () => [{ type: "Personnels", id: "LIST" }],
    }),
    putPersonnelCompanies: builder.mutation<string, PersonnelTransferType>({
      queryFn: async (arg) => {
        if (!arg.personnel) return { error: "Lỗi put personnel" };
        try {
          await updateDoc(doc(storeFB, "personnels", arg.personnel), {
            companies: arg.companies,
          });

          return { data: "Cập nhật thành công" };
        } catch (error) {
          return { error: "Lỗi put personnel" };
        }
      },
      invalidatesTags: (_, __, arg) => [
        { type: "Personnels", id: arg.personnel },
      ],
    }),
    deletePersonnel: builder.mutation<string, string>({
      query: (arg) => ({ url: `/personnel/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Personnels", id }],
    }),
  }),
});

export const {
  useGetPersonnelsQuery,
  useGetPersonnelQuery,
  usePostPersonnelMutation,
  usePutPersonnelCompaniesMutation,
  useDeletePersonnelMutation,
} = personnelApi;
