import React from "react";

const Input = (props: any) => {
  return (
    <input
      className="mb-3 w-full rounded-md border border-gray-400 px-3 py-2"
      type={props.type}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
