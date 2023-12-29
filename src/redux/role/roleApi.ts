import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RoleGetAllType } from "~/types/role";
import { envs } from "~/utils/env";
import { prepareHeadersCustom } from "../base";

export const roleApi = createApi({
  reducerPath: "roleApi",
  tagTypes: ["RoleAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    getRoles: builder.query<RoleGetAllType[], void>({
      query: () => "/role/all",
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: "RoleAll" as const,
              id,
            })),
            { type: "RoleAll" as const, id: "LIST" },
          ];
        } else return [{ type: "RoleAll" as const, id: "LIST" }];
      },
    }),
  }),
});

export const { useGetRolesQuery } = roleApi;
