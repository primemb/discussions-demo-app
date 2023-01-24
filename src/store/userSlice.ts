import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../models/interfaces";

interface IUserState {
  user: IUser;
  selectForReply: number | null;
}

const initialState: IUserState = {
  user: {
    name: "Bessie Cooper",
    avatar:
      "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
  },
  selectForReply: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectReply: (state, action: PayloadAction<number>) => {
      state.selectForReply = action.payload;
    },
  },
});
export const { selectReply } = userSlice.actions;
export default userSlice.reducer;
