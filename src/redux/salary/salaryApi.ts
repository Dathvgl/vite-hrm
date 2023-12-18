import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SalaryState = {
  salary?: number;
};

const initialState: SalaryState = {};

export const salarySlice = createSlice({
  name: "salarySlice",
  initialState,
  reducers: {
    initSalary: (state, action: PayloadAction<number | undefined>) => {
      state.salary = action.payload;
    },
  },
});

export const { initSalary } = salarySlice.actions;
