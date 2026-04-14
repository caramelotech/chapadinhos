import React from "react";

const Button = (props: any) => {
  return (
    <button
      type="button"
      className="w-full rounded-xl bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-600"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
