import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import {
  CompaniesGetType,
  CompanyAllGetType,
  CompanyPostType,
} from "~/types/company";
import { envs } from "~/utils/env";
import { prepareHeadersCustom } from "../base";

export const companyApi = createApi({
  reducerPath: "companyApi",
  tagTypes: ["Companies", "CompanyAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    getCompanies: builder.query<ListResult<CompaniesGetType>, number>({
      query: (arg) => `/company?page=${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Companies" as const,
              id,
            })),
            { type: "Companies" as const, id: "PARTIAL-LIST" },
          ];
        } else return [{ type: "Companies" as const, id: "PARTIAL-LIST" }];
      },
    }),
    getCompanyAll: builder.query<CompanyAllGetType[], void>({
      query: () => "/company/all",
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: "CompanyAll" as const,
              id,
            })),
            { type: "CompanyAll" as const, id: "LIST" },
          ];
        } else return [{ type: "CompanyAll" as const, id: "LIST" }];
      },
    }),
    postCompany: builder.mutation<string, CompanyPostType>({
      query: (arg) => ({ url: "/company", method: "POST", body: arg }),
      invalidatesTags: () => [
        { type: "Companies", id: "PARTIAL-LIST" },
        { type: "CompanyAll", id: "LIST" },
      ],
    }),
    deleteCompany: builder.mutation<string, string>({
      query: (arg) => ({ url: `/company/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "Companies", id },
        { type: "CompanyAll", id },
      ],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyAllQuery,
  usePostCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
