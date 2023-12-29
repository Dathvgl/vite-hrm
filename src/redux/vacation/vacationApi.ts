import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import {
  VacationPostType,
  VacationType,
  VacationsGetType,
} from "~/types/vacation";
import { envs } from "~/utils/env";
import { prepareHeadersCustom } from "../base";

export const vacationApi = createApi({
  reducerPath: "vacationApi",
  tagTypes: ["Vacations"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    getVacations: builder.query<ListResult<VacationsGetType>, number>({
      query: (arg) => `/vacation?page=${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Vacations" as const,
              id,
            })),
            { type: "Vacations" as const, id: "LIST" },
          ];
        } else return [{ type: "Vacations" as const, id: "LIST" }];
      },
    }),
    postVacation: builder.mutation<string, VacationPostType>({
      query: (arg) => ({ url: "/vacation", method: "POST", body: arg }),
      invalidatesTags: () => [{ type: "Vacations", id: "LIST" }],
    }),
    putVacationStatus: builder.mutation<
      string,
      Pick<VacationType, "id" | "status">
    >({
      query: (arg) => ({
        url: `/vacation/status/${arg.id}`,
        method: "PUT",
        body: { status: arg.status },
      }),
      invalidatesTags: (_, __, arg) => [{ type: "Vacations", id: arg.id }],
    }),
    deleteVacation: builder.mutation<string, string>({
      query: (arg) => ({ url: `/vacation/${arg}`, method: "DELETE" }),
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
