interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({ text, onClick, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="w-full rounded-xl bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-600"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
