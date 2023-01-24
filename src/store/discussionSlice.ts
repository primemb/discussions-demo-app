import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { discussionsMockData } from "../models/data";
import { IDiscussion } from "../models/interfaces";
import { findDiscussionById } from "../util/util";

const initialState: IDiscussion[] = discussionsMockData;

export const discussionSlice = createSlice({
  name: "discussion",
  initialState: initialState,
  reducers: {
    like: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const { parentIndex, childIndex } = findDiscussionById(state, id);
      if (parentIndex !== undefined && childIndex === undefined) {
        if (state[parentIndex].iLikedIt) {
          state[parentIndex].iLikedIt = false;
          state[parentIndex].likes -= 1;
        } else {
          state[parentIndex].iLikedIt = true;
          state[parentIndex].likes += 1;
        }
      } else if (parentIndex !== undefined && childIndex !== undefined) {
        if (state[parentIndex].replies[childIndex].iLikedIt) {
          state[parentIndex].replies[childIndex].iLikedIt = false;
          state[parentIndex].replies[childIndex].likes -= 1;
        } else {
          state[parentIndex].replies[childIndex].iLikedIt = true;
          state[parentIndex].replies[childIndex].likes += 1;
        }
      }
    },
    addComment: (state, action: PayloadAction<IDiscussion>) => {
      state.unshift(action.payload);
    },
    addReplay: (
      state,
      action: PayloadAction<{ discussion: IDiscussion; id: number }>
    ) => {
      const { id, discussion } = action.payload;
      const index = state.findIndex((d) => d.id === id);
      if (index !== -1) {
        state[index].replies.push(discussion);
      }
    },
  },
});

export const { like, addComment, addReplay } = discussionSlice.actions;

export default discussionSlice.reducer;
