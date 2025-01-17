import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import employeeSlice from "./slices/employeeSlice";


export const store = configureStore({
    reducer: {
       allEmployees : employeeSlice
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;