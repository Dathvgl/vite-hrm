import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TimesheetPostType, TimesheetTimeGetType } from "~/types/timesheet";
import { envs } from "~/utils/env";

export const timesheetApi = createApi({
  reducerPath: "timesheetApi",
  tagTypes: ["Timesheets", "TimesheetAll"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
  }),
  endpoints: (builder) => ({
    getTimesheetCurrent: builder.query<
      TimesheetTimeGetType | null,
      { id: string; month: number; year: number }
    >({
      query: (arg) =>
        `/timesheet/${arg.id}?month=${arg.month}&year=${arg.year}`,
      providesTags: (result) => {
        if (result) {
          return [{ type: "Timesheets" as const, id: result.id }];
        } else return [{ type: "Timesheets" as const, id: "PARTIAL-LIST" }];
      },
    }),
    postTimesheet: builder.mutation<string, TimesheetPostType>({
      query: (arg) => ({ url: "/timesheet", method: "POST", body: arg }),
      invalidatesTags: () => [
        { type: "Timesheets", id: "PARTIAL-LIST" },
        { type: "TimesheetAll", id: "LIST" },
      ],
    }),
    putTimesheetDay: builder.mutation<string, { id: string; days: number[] }>({
      query: (arg) => ({
        url: `/timesheet/day/${arg.id}`,
        method: "PUT",
        body: { days: arg.days },
      }),
      invalidatesTags: () => [
        { type: "Timesheets", id: "PARTIAL-LIST" },
        { type: "TimesheetAll", id: "LIST" },
      ],
    }),
    deleteTimesheet: builder.mutation<string, string>({
      query: (arg) => ({ url: `/timesheet/${arg}`, method: "DELETE" }),
      invalidatesTags: (_, __, id) => [
        { type: "Timesheets", id },
        { type: "TimesheetAll", id },
      ],
    }),
  }),
});

export const {
  useGetTimesheetCurrentQuery,
  usePostTimesheetMutation,
  usePutTimesheetDayMutation,
  useDeleteTimesheetMutation,
} = timesheetApi;
