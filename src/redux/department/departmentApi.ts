import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import {
  DepartmentAllGetType,
  DepartmentPostType,
  DepartmentPutType,
  DepartmentsGetType,
} from "~/types/department";
import { envs } from "~/utils/env";
import { prepareHeadersCustom } from "../base";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  tagTypes: ["Departments", "DepartmentAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    getDepartments: builder.query<ListResult<DepartmentsGetType>, number>({
      query: (arg) => `/department?page=${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Departments" as const,
              id,
            })),
            { type: "Departments" as const, id: "PARTIAL-LIST" },
          ];
        } else return [{ type: "Departments" as const, id: "PARTIAL-LIST" }];
      },
    }),
    getDepartmentAll: builder.query<DepartmentAllGetType[], void>({
      query: () => "/department/all",
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: "DepartmentAll" as const,
              id,
            })),
            { type: "DepartmentAll" as const, id: "LIST" },
          ];
        } else return [{ type: "DepartmentAll" as const, id: "LIST" }];
      },
    }),
    postDepartment: builder.mutation<string, DepartmentPostType>({
      query: (arg) => ({ url: "/department", method: "POST", body: arg }),
      invalidatesTags: () => [
        { type: "Departments", id: "PARTIAL-LIST" },
        { type: "DepartmentAll", id: "LIST" },
      ],
    }),
    putDepartment: builder.mutation<string, DepartmentPutType & { id: string }>(
      {
        query: ({ id, ...rest }) => ({
          url: `/department/${id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: () => [
          { type: "Departments", id: "PARTIAL-LIST" },
          { type: "DepartmentAll", id: "LIST" },
        ],
      }
    ),
    deleteDepartment: builder.mutation<string, string>({
      query: (arg) => ({ url: `/department/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "Departments", id },
        { type: "DepartmentAll", id },
      ],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentAllQuery,
  usePostDepartmentMutation,
  usePutDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
