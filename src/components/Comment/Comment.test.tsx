import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IComment } from "../../models/interfaces";
import { renderWithProviders } from "../../util/test-utils";
import Comment, { ICommentProps } from "./Comment";

describe("Comment", () => {
  const renderComment = (comment: Partial<IComment> = {}, isReply = false) => {
    const props: ICommentProps = {
      comment: {
        id: 6,
        date: 1672581614000,
        user: {
          name: "Bessie Cooper",
          avatar:
            "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
        },
        text: "We plan to run the compaign on Friday - as far as I know. Do you think you will get this done by Thursday @Marvin?",
        likes: 0,
        iLikedIt: false,
        ...comment,
      },
      isReply,
    };

    return renderWithProviders(<Comment {...props} />);
  };
  it("show correct name", () => {
    const config: Partial<IComment> = {
      user: { name: "user test", avatar: "http://fake.com/1.jpeg" },
    };
    renderComment(config);
    const name = screen.getByText("user test");
    expect(name).toBeInTheDocument();
  });

  it("show user image", () => {
    const config: Partial<IComment> = {
      user: { name: "user test", avatar: "http://fake.com/1.jpeg" },
    };
    renderComment(config);
    const img = screen.getByRole("img", { name: /test/i });
    expect(img).toHaveAttribute("src", "http://fake.com/1.jpeg");
  });

  it("show comment text", () => {
    const config: Partial<IComment> = {
      text: "demo text for testing",
    };
    renderComment(config);
    const text = screen.getByText("demo text for testing");
    expect(text).toBeInTheDocument();
  });
  it("triggers right function", async () => {
    const config: Partial<IComment> = {
      id: 1,
    };
    const { store } = renderComment(config);
    const button = screen.getByRole("button", { name: /reply/i });
    await userEvent.click(button);
    const selectedReplay = store.getState().user.selectForReply;
    expect(selectedReplay).toBe(1);
  });
});
