import React from "react";
import PropTypes from "prop-types";

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
  name: string;
}

export default function TextInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  name,
}: TextInputProps): JSX.Element {
  return (
    <div className="relative text-input-group ease-in-out transition-all p-2 m-2 justify-center flex">
      <label className="absolute -top-2 transition-all p-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="block text-base px-2 pt-2 pb-1 bg-black border-b-2 border-b-slate-700 focus:border-b-white focus:outline-1 focus:outline-offset-8 shadow-lg transition-all"
        id={id}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        name={name}
      ></input>
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};
