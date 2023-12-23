import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import {
  PersonnelAllGetType,
  PersonnelPostType,
  PersonnelType,
  PersonnelsGetCompany,
  PersonnelsGetManagement,
  PersonnelsGetRoles,
} from "~/types/personnel";
import { envs } from "~/utils/env";
import { PersonnelTransferType } from "./personnelSlice";

export type PersonnelQueryType = {
  page: number;
  type: "management" | "company" | "role" | "all";
  limit?: number;
  company?: string;
  name?: string;
  phone?: string;
  position?: string;
};

export const personnelApi = createApi({
  reducerPath: "personnelApi",
  tagTypes: ["Personnels", "PersonnelAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
  }),
  endpoints: (builder) => ({
    getPersonnels: builder.query<
      ListResult<
        PersonnelsGetManagement | PersonnelsGetCompany | PersonnelsGetRoles
      >,
      PersonnelQueryType
    >({
      query: (arg) => {
        const search: string[] = [];

        Object.keys(arg).forEach((key) => {
          const item = arg[key as keyof typeof arg];

          if (item && item != "") {
            search.push(`${key}=${item}`);
          }
        });

        return { url: `/personnel?${search.join("&")}` };
      },
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Personnels" as const,
              id,
            })),
            { type: "Personnels" as const, id: "PARTIAL-LIST" },
          ];
        } else return [{ type: "Personnels" as const, id: "PARTIAL-LIST" }];
      },
    }),
    getPersonnelAll: builder.query<PersonnelAllGetType[], void>({
      query: () => "/personnel/all",
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: "PersonnelAll" as const,
              id,
            })),
            { type: "PersonnelAll" as const, id: "LIST" },
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
    postPersonnel: builder.mutation<string, PersonnelPostType>({
      query: (arg) => ({ url: "/personnel", method: "POST", body: arg }),
      invalidatesTags: () => [
        { type: "Personnels", id: "PARTIAL-LIST" },
        { type: "PersonnelAll", id: "LIST" },
      ],
    }),
    putPersonnelCompany: builder.mutation<string, PersonnelTransferType>({
      query: (arg) => ({
        url: `/personnel/company/${arg.personnel}`,
        method: "PUT",
        body: { company: arg.company },
      }),
      invalidatesTags: (_, __, arg) => [
        { type: "Personnels", id: arg.personnel },
      ],
    }),
    putPersonnelRole: builder.mutation<string, { id: string; roles: string[] }>(
      {
        query: (arg) => ({
          url: `/personnel/role/${arg.id}`,
          method: "PUT",
          body: { roles: arg.roles },
        }),
        invalidatesTags: (_, __, arg) => [{ type: "Personnels", id: arg.id }],
      }
    ),
    deletePersonnel: builder.mutation<string, string>({
      query: (arg) => ({ url: `/personnel/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [{ type: "Personnels", id }],
    }),
  }),
});

export const {
  useGetPersonnelsQuery,
  useGetPersonnelQuery,
  useGetPersonnelAllQuery,
  usePostPersonnelMutation,
  usePutPersonnelCompanyMutation,
  usePutPersonnelRoleMutation,
  useDeletePersonnelMutation,
} = personnelApi;
