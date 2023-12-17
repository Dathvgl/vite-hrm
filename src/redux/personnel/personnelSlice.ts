import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PersonnelTransferType = {
  personnel?: string;
  companies: string[];
};

type PersonnelState = {
  transfer: PersonnelTransferType;
};

const initialState: PersonnelState = { transfer: { companies: [] } };

export const personnelSlice = createSlice({
  name: "personnelSlice",
  initialState,
  reducers: {
    transferPersonnelPersonnel: (state, action: PayloadAction<string>) => {
      state.transfer.personnel = action.payload;
    },
    transferPersonnelCompany: (state, action: PayloadAction<string[]>) => {
      state.transfer.companies = action.payload;
    },
  },
});

export const { transferPersonnelPersonnel, transferPersonnelCompany } =
  personnelSlice.actions;
