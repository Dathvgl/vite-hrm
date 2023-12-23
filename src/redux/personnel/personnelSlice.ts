import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PersonnelType } from "~/types/personnel";

type UserFB = PersonnelType | null;

export type PersonnelFilter = {
  name?: string;
  position?: string;
  phone?: string;
  selection: string;
};

export type PersonnelFilterSearch = Omit<PersonnelFilter, "selection">;

export type PersonnelTransferType = {
  personnel?: string;
  company: string | null;
  companyCurrent: string | null;
};

type PersonnelState = {
  user: UserFB;
  filter: PersonnelFilter;
  transfer: PersonnelTransferType;
};

const initialState: PersonnelState = {
  user: null,
  filter: { selection: "all" },
  transfer: { company: null, companyCurrent: null },
};

export const personnelSlice = createSlice({
  name: "personnelSlice",
  initialState,
  reducers: {
    initUser: (state, action: PayloadAction<UserFB>) => {
      state.user = action.payload;
    },
    userFilterSelect: (state, action: PayloadAction<string>) => {
      state.filter.selection = action.payload;
    },
    userFilterSearch: (state, action: PayloadAction<PersonnelFilterSearch>) => {
      state.filter = { ...action.payload, selection: state.filter.selection };
    },
    transferPersonnelPersonnel: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.transfer.personnel = action.payload;
    },
    transferPersonnelCompany: (state, action: PayloadAction<string>) => {
      state.transfer.company = action.payload;
    },
    transferPersonnelCompanyCurrent: (state, action: PayloadAction<string>) => {
      state.transfer.companyCurrent = action.payload;
    },
  },
});

export const {
  initUser,
  userFilterSelect,
  userFilterSearch,
  transferPersonnelPersonnel,
  transferPersonnelCompany,
  transferPersonnelCompanyCurrent,
} = personnelSlice.actions;
