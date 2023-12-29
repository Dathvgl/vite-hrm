import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import {
  PositionAllGetType,
  PositionPostType,
  PositionsGetType,
} from "~/types/position";
import { envs } from "~/utils/env";
import { prepareHeadersCustom } from "../base";

export const positionApi = createApi({
  reducerPath: "positionApi",
  tagTypes: ["Positions", "PositionAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
    prepareHeaders: prepareHeadersCustom,
  }),
  endpoints: (builder) => ({
    getPositions: builder.query<ListResult<PositionsGetType>, number>({
      query: (arg) => `/position?page=${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Positions" as const,
              id,
            })),
            { type: "Positions" as const, id: "PARTIAL-LIST" },
          ];
        } else return [{ type: "Positions" as const, id: "PARTIAL-LIST" }];
      },
    }),
    getPositionAll: builder.query<
      PositionAllGetType[],
      string | undefined
    >({
      query: (arg) => `/position/${arg}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({
              type: "PositionAll" as const,
              id,
            })),
            { type: "PositionAll" as const, id: "LIST" },
          ];
        } else return [{ type: "PositionAll" as const, id: "LIST" }];
      },
    }),
    postPosition: builder.mutation<string, PositionPostType>({
      query: (arg) => ({ url: "/position", method: "POST", body: arg }),
      invalidatesTags: () => [
        { type: "Positions", id: "PARTIAL-LIST" },
        { type: "PositionAll", id: "LIST" },
      ],
    }),
    deletePosition: builder.mutation<string, string>({
      query: (arg) => ({ url: `/position/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "Positions", id },
        { type: "PositionAll", id },
      ],
    }),
  }),
});

export const {
  useGetPositionsQuery,
  useGetPositionAllQuery,
  usePostPositionMutation,
  useDeletePositionMutation,
} = positionApi;
