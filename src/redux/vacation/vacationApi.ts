import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { VacationType } from "~/types/vacation";
import { storeFB } from "~/utils/firebase";

export const vacationApi = createApi({
  reducerPath: "vacationApi",
  tagTypes: ["Vacations"],
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getVacations: builder.query<VacationType[], void>({
      queryFn: async () => {
        try {
          const data: VacationType[] = [];

          const querySnapshot = await getDocs(collection(storeFB, "vacations"));
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id } as VacationType);
          });

          return { data };
        } catch (error) {
          return { error: "Lỗi get vacations" };
        }
      },
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "Vacations" as const, id })),
            { type: "Vacations" as const, id: "LIST" },
          ];
        } else return [{ type: "Vacations" as const, id: "LIST" }];
      },
    }),
    postVacation: builder.mutation<string, VacationType>({
      queryFn: async (arg) => {
        try {
          await addDoc(collection(storeFB, "vacations"), arg);
          return { data: "Tạo thành công" };
        } catch (error) {
          return { error: "Lỗi post vacation" };
        }
      },
      invalidatesTags: () => [{ type: "Vacations", id: "LIST" }],
    }),
    putVacationStatus: builder.mutation<
      string,
      Pick<VacationType, "id" | "status">
    >({
      queryFn: async (arg) => {
        try {
          await updateDoc(doc(storeFB, "vacations", arg.id), {
            status: arg.status,
          });

          return { data: "Cập nhật thành công" };
        } catch (error) {
          return { error: "Lỗi put vacation" };
        }
      },
      invalidatesTags: (_, __, arg) => [{ type: "Vacations", id: arg.id }],
    }),
    deleteVacation: builder.mutation<string, string>({
      queryFn: async (arg) => {
        try {
          await deleteDoc(doc(storeFB, "vacations", arg));
          return { data: "Xóa thành công" };
        } catch (error) {
          return { error: "Lỗi delete vacation" };
        }
      },
      invalidatesTags: (_, __, id) => [{ type: "Vacations", id }],
    }),
  }),
});

export const {
  useGetVacationsQuery,
  usePostVacationMutation,
  usePutVacationStatusMutation,
  useDeleteVacationMutation,
} = vacationApi;
