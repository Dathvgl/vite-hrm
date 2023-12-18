import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersonnelType } from "~/types/personnel";

type UserFB = PersonnelType | null;

export type PersonnelTransferType = {
  personnel?: string;
  companies: string[];
};

type PersonnelState = {
  user: UserFB;
  transfer: PersonnelTransferType;
};

const initialState: PersonnelState = {
  user: null,
  transfer: { companies: [] },
};

export const personnelSlice = createSlice({
  name: "personnelSlice",
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<UserFB>) => {
      state.user = action.payload;
    },
    transferPersonnelPersonnel: (state, action: PayloadAction<string>) => {
      state.transfer.personnel = action.payload;
    },
    transferPersonnelCompany: (state, action: PayloadAction<string[]>) => {
      state.transfer.companies = action.payload;
    },
  },
});

export const {
  initUser,
  transferPersonnelPersonnel,
  transferPersonnelCompany,
} = personnelSlice.actions;
