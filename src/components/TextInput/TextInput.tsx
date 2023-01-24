import classes from "./TextInput.module.scss";

export interface ITextInputProps {
  value: string;
  type: "text" | "number" | "email";
  onChange: (value: string) => void;
  onKeyDown: (key: React.KeyboardEvent<HTMLInputElement>) => void;
  placeHolder: string | undefined;
}

const TextInput = ({
  value,
  onKeyDown,
  onChange,
  placeHolder,
  type,
}: ITextInputProps) => {
  return (
    <input
      className={classes.container}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(k) => onKeyDown(k)}
      placeholder={placeHolder}
    />
  );
};

export default TextInput;
