import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
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
import { authFB, storeFB } from "~/utils/firebase";
import { PersonnelTransferType } from "./personnelSlice";

export const personnelApi = createApi({
  reducerPath: "personnelApi",
  tagTypes: ["Personnels"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getPersonnels: builder.query<PersonnelType[], void>({
      queryFn: async () => {
        try {
          const data: PersonnelType[] = [];

          const querySnapshot = await getDocs(
            collection(storeFB, "personnels")
          );

          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as PersonnelType);
          });

          return { data };
        } catch (error) {
          return { error: "Lỗi get personnels" };
        }
      },
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "Personnels" as const, id })),
            { type: "Personnels" as const, id: "LIST" },
          ];
        } else return [{ type: "Personnels" as const, id: "LIST" }];
      },
    }),
    getPersonnel: builder.query<PersonnelType | null, string | undefined>({
      queryFn: async (arg) => {
        if (!arg) return { data: null };
        try {
          const docSnap = await getDoc(doc(storeFB, "personnels", arg));
          return { data: { ...docSnap.data(), id: arg } as PersonnelType };
        } catch (error) {
          return { error: "Lỗi get personnel" };
        }
      },
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
      queryFn: async (_) => {
        try {
          // await deleteDoc(doc(storeFB, "personnels", arg));
          return { data: "Xóa thành công" };
        } catch (error) {
          return { error: "Lỗi delete personnel" };
        }
      },
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
