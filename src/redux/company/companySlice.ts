import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type CompanyState = {
  selection: string;
};

const initialState: CompanyState = {
  selection: "all",
};

export const companySlice = createSlice({
  name: "companySlice",
  initialState,
  reducers: {
    companySelect: (state, action: PayloadAction<string>) => {
      state.selection = action.payload;
    },
  },
});

export const { companySelect } = companySlice.actions;
