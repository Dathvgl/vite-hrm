import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ListResult } from "~/types/base";
import { CalculatorSalaryType } from "~/types/calculator";
import { envs } from "~/utils/env";

export const calculatorApi = createApi({
  reducerPath: "calculatorApi",
  tagTypes: ["Calculators"],
  baseQuery: fetchBaseQuery({
    baseUrl: envs.VITE_NODE_SERVER + "/api",
  }),
  endpoints: (builder) => ({
    getCalculators: builder.query<
      ListResult<CalculatorSalaryType> | null,
      {
        page: number;
        month: number | undefined;
        year: number | undefined;
        department: string | undefined;
        company: string;
      }
    >({
      query: (arg) =>
        `/calculator/salary?page=${arg.page}&month=${arg.month}&year=${
          arg.year
        }&company=${arg.company}${
          arg.department == undefined ? "" : `&department=${arg.department}`
        }`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.data.map(({ id }) => ({
              type: "Calculators" as const,
              id,
            })),
            { type: "Calculators" as const, id: "PARTIAL-LIST" },
          ];
        } else return [{ type: "Calculators" as const, id: "PARTIAL-LIST" }];
      },
    }),
  }),
});

export const { useGetCalculatorsQuery } = calculatorApi;
