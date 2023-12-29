import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import {
  SalariesGetType,
  SalaryAllGetType,
  SalaryContractPostType,
  SalaryPostType,
  SalaryProductPostType,
  SalaryRevenuePostType,
} from "~/types/salary";
import { envs } from "~/utils/env";
import { prepareHeadersCustom } from "../base";

export const salaryApi = createApi({
  reducerPath: "salaryApi",
  tagTypes: ["Salaries", "SalaryAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    getSalaries: builder.query<ListResult<SalariesGetType>, number>({
      query: (arg) => `/salary?page=${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Salaries" as const,
              id,
            })),
            { type: "Salaries" as const, id: "PARTIAL-LIST" },
          ];
        } else return [{ type: "Salaries" as const, id: "PARTIAL-LIST" }];
      },
    }),
    getSalaryAll: builder.query<SalaryAllGetType[], void>({
      query: () => "/salary/all",
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: "SalaryAll" as const,
              id,
            })),
            { type: "SalaryAll" as const, id: "LIST" },
          ];
        } else return [{ type: "SalaryAll" as const, id: "LIST" }];
      },
    }),
    postSalary: builder.mutation<string, SalaryPostType>({
      query: (arg) => ({ url: "/salary", method: "POST", body: arg }),
      invalidatesTags: () => [
        { type: "Salaries", id: "PARTIAL-LIST" },
        { type: "SalaryAll", id: "LIST" },
      ],
    }),
    postSalaryRevenue: builder.mutation<
      string,
      SalaryRevenuePostType & { id: string }
    >({
      query: ({ id, ...rest }) => ({
        url: `/salary/revenue/${id}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: () => [
        { type: "Salaries", id: "PARTIAL-LIST" },
        { type: "SalaryAll", id: "LIST" },
      ],
    }),
    postSalaryContract: builder.mutation<
      string,
      SalaryContractPostType & { id: string }
    >({
      query: ({ id, ...rest }) => ({
        url: `/salary/contract/${id}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: () => [
        { type: "Salaries", id: "PARTIAL-LIST" },
        { type: "SalaryAll", id: "LIST" },
      ],
    }),
    postSalaryProduct: builder.mutation<
      string,
      SalaryProductPostType & { id: string }
    >({
      query: ({ id, ...rest }) => ({
        url: `/salary/product/${id}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: () => [
        { type: "Salaries", id: "PARTIAL-LIST" },
        { type: "SalaryAll", id: "LIST" },
      ],
    }),
    deleteSalary: builder.mutation<string, string>({
      query: (arg) => ({ url: `/salary/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "Salaries", id },
        { type: "SalaryAll", id },
      ],
    }),
  }),
});

export const {
  useGetSalariesQuery,
  useGetSalaryAllQuery,
  usePostSalaryMutation,
  usePostSalaryRevenueMutation,
  usePostSalaryContractMutation,
  usePostSalaryProductMutation,
  useDeleteSalaryMutation,
} = salaryApi;
