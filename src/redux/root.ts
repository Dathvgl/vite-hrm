import { combineReducers } from "@reduxjs/toolkit";
import { companyApi } from "./company/companyApi";
import { companySlice } from "./company/companySlice";
import { personnelApi } from "./personnel/personnelApi";
import { personnelSlice } from "./personnel/personnelSlice";
import { vacationApi } from "./vacation/vacationApi";

const rootReducer = combineReducers({
  [companyApi.reducerPath]: companyApi.reducer,
  [personnelApi.reducerPath]: personnelApi.reducer,
  [personnelSlice.reducerPath]: personnelSlice.reducer,
  [vacationApi.reducerPath]: vacationApi.reducer,
  [companySlice.reducerPath]: companySlice.reducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
