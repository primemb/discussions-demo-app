import { screen } from "@testing-library/react";
import { IComment } from "../../models/interfaces";
import { renderWithProviders } from "../../util/test-utils";
import Discussion from "./Discussion";

describe("Discussion", () => {
  const renderDiscussion = () => {
    const comment: IComment = {
      id: 2,
      date: 1672232414000,
      user: {
        name: "Marvin McKinney",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
      text: "This is test text",
      likes: 2,
      iLikedIt: false,
    };
    const replies = [
      {
        id: 2,
        date: 1672232414000,
        user: {
          name: "Marvin McKinney",
          avatar:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        },
        text: "test 1",
        likes: 2,
        iLikedIt: false,
      },
      {
        id: 3,
        date: 1672232414000,
        user: {
          name: "Marvin McKinney",
          avatar:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        },
        text: "test 2",
        likes: 2,
        iLikedIt: false,
      },
    ];
    renderWithProviders(<Discussion comment={comment} replies={replies} />);
  };

  it("show comment", () => {
    renderDiscussion();
    const element = screen.getByRole("listitem", { name: "comment" });
    const text = screen.getByText("This is test text");
    expect(element).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it("show replies", () => {
    renderDiscussion();
    const elements = screen.getAllByRole("listitem", { name: "reply" });
    expect(elements).toHaveLength(2);
  });
});
