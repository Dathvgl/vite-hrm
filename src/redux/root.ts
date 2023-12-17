import { combineReducers } from "@reduxjs/toolkit";
import { companyApi } from "./company/companyApi";

const rootReducer = combineReducers({
  [companyApi.reducerPath]: companyApi.reducer,
});

export default rootReducer;
export type RootReducer = ReturnType<typeof rootReducer>;
