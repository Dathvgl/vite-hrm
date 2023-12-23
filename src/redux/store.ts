import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { companyApi } from "./company/companyApi";
import { departmentApi } from "./department/departmentApi";
import { personnelApi } from "./personnel/personnelApi";
import { personnelSlice } from "./personnel/personnelSlice";
import { positionApi } from "./position/positionApi";
import { roleApi } from "./role/roleApi";
import rootReducer, { RootReducer } from "./root";
import { salarySlice } from "./salary/salarySlice";
import { vacationApi } from "./vacation/vacationApi";

const persistConfig: PersistConfig<RootReducer> = {
  key: "root",
  storage,
  blacklist: [personnelSlice.reducerPath, salarySlice.reducerPath],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    })
      .concat(companyApi.middleware)
      .concat(personnelApi.middleware)
      .concat(vacationApi.middleware)
      .concat(departmentApi.middleware)
      .concat(positionApi.middleware)
      .concat(roleApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
