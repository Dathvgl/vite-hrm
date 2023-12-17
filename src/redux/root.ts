import { combineReducers } from "@reduxjs/toolkit";
import { companyApi } from "./company/companyApi";
import { personnelApi } from "./personnel/personnelApi";
import { personnelSlice } from "./personnel/personnelSlice";

const rootReducer = combineReducers({
  [companyApi.reducerPath]: companyApi.reducer,
  [personnelApi.reducerPath]: personnelApi.reducer,
  [personnelSlice.reducerPath]: personnelSlice.reducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
