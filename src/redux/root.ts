import { combineReducers } from "@reduxjs/toolkit";
import { calculatorApi } from "./calculator/calculatorApi";
import { companyApi } from "./company/companyApi";
import { departmentApi } from "./department/departmentApi";
import { personnelApi } from "./personnel/personnelApi";
import { personnelSlice } from "./personnel/personnelSlice";
import { positionApi } from "./position/positionApi";
import { roleApi } from "./role/roleApi";
import { salaryApi } from "./salary/salaryApi";
import { timesheetApi } from "./timesheet/timesheetApi";
import { vacationApi } from "./vacation/vacationApi";

const rootReducer = combineReducers({
  [companyApi.reducerPath]: companyApi.reducer,
  [personnelApi.reducerPath]: personnelApi.reducer,
  [personnelSlice.reducerPath]: personnelSlice.reducer,
  [vacationApi.reducerPath]: vacationApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [positionApi.reducerPath]: positionApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
  [salaryApi.reducerPath]: salaryApi.reducer,
  [timesheetApi.reducerPath]: timesheetApi.reducer,
  [calculatorApi.reducerPath]: calculatorApi.reducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
