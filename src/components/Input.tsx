import { type InputHTMLAttributes } from "react";

type InputProps = Pick<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder" | "value" | "onChange">;

const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      className="mb-3 w-full rounded-md border border-gray-400 px-3 py-2"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
