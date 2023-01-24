import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import discussionReducer from "./discussionSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    discussion: discussionReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
