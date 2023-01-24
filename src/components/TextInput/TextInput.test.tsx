import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextInput, { ITextInputProps } from "./TextInput";

describe("TextInput", () => {
  const renderTextInput = (config: Partial<ITextInputProps> = {}) => {
    const props: ITextInputProps = {
      value: "",
      type: "text",
      onChange: () => {},
      onKeyDown: () => {},
      placeHolder: "",
      ...config,
    };
    render(<TextInput {...props} />);
  };
  it("should show correct placeHolder", () => {
    const placeHolder = "test placeholder";
    renderTextInput({ placeHolder });
    const element = screen.getByRole("textbox");
    expect(element).toHaveAttribute("placeholder", placeHolder);
  });
  it("trigger onChange function when user enter something", async () => {
    const changeHandler = vi.fn();
    renderTextInput({ onChange: changeHandler });
    const element = screen.getByRole("textbox");
    await userEvent.type(element, "t");
    expect(changeHandler).toHaveBeenCalledWith("t");
  });
  it("trigger onKeyDown function when user enter something", async () => {
    const changeHandler = vi.fn();
    renderTextInput({ onKeyDown: changeHandler });
    const element = screen.getByRole("textbox");
    await userEvent.type(element, "t");
    expect(changeHandler).toHaveBeenCalled();
  });
});
