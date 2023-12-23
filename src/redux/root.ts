import { combineReducers } from "@reduxjs/toolkit";
import { companyApi } from "./company/companyApi";
import { departmentApi } from "./department/departmentApi";
import { personnelApi } from "./personnel/personnelApi";
import { personnelSlice } from "./personnel/personnelSlice";
import { positionApi } from "./position/positionApi";
import { roleApi } from "./role/roleApi";
import { salarySlice } from "./salary/salaryApi";
import { vacationApi } from "./vacation/vacationApi";

const rootReducer = combineReducers({
  [companyApi.reducerPath]: companyApi.reducer,
  [personnelApi.reducerPath]: personnelApi.reducer,
  [personnelSlice.reducerPath]: personnelSlice.reducer,
  [vacationApi.reducerPath]: vacationApi.reducer,
  [salarySlice.reducerPath]: salarySlice.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [positionApi.reducerPath]: positionApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
