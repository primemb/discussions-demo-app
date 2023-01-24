import { renderWithProviders } from "../../util/test-utils";
import LikeButton, { ILikeButtonProps } from "./LikeButton";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { IDiscussion } from "../../models/interfaces";
import moment from "moment";
import { addComment } from "../../store/discussionSlice";

describe("LikeButton", () => {
  const renderLikeButton = (
    config: Partial<ILikeButtonProps> = {},
    testDiscussion: Partial<IDiscussion> = {}
  ) => {
    const testData: IDiscussion = {
      date: +moment().format("x"),
      id: 10,
      replies: [],
      iLikedIt: false,
      likes: 0,
      text: "test",
      user: { name: "test", avatar: "" },
      ...testDiscussion,
    };
    const props: ILikeButtonProps = {
      likes: 0,
      id: 1,
      isLiked: false,
      ...config,
    };

    // eslint-disable-next-line testing-library/render-result-naming-convention
    const result = renderWithProviders(<LikeButton {...props} />);
    const store = result.store;
    store.dispatch(addComment(testData));
    return result;
  };
  describe("when isLiked is false", () => {
    it("add likes and change isLiked to true", async () => {
      const config: Partial<ILikeButtonProps> = {
        id: 10,
        isLiked: false,
        likes: 0,
      };
      const testData: Partial<IDiscussion> = { iLikedIt: false };
      const { store } = renderLikeButton(config, testData);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      const findedData = store.getState().discussion.find((d) => d.id === 10);
      const newLikes = findedData?.likes;
      const isLike = findedData?.iLikedIt;
      expect(newLikes).toBe(1);
      expect(isLike).toBe(true);
    });
  });
  describe("when isLiked is true", () => {
    it("remove likes and change isLiked to false", async () => {
      const config: Partial<ILikeButtonProps> = {
        id: 10,
        isLiked: false,
        likes: 0,
      };
      const testData: Partial<IDiscussion> = { iLikedIt: true, likes: 1 };
      const { store } = renderLikeButton(config, testData);
      const button = screen.getByRole("button");
      await userEvent.click(button);
      const findedData = store.getState().discussion.find((d) => d.id === 10);
      const newLikes = findedData?.likes;
      expect(newLikes).toBe(0);
    });
  });
});
