import React from "react";
import PropTypes from "prop-types";

interface TextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
  name: string;
}

// Do I need the value prop? Does not seem like it

export default function TextField({
  id,
  label,
  placeholder,
  value,
  onChange,
  name,
}: TextFieldProps): JSX.Element {
  return (
    <div className="relative text-input-group ease-in-out transition-all p-2 m-2 justify-center flex">
      <label className="absolute -top-2 transition-all p-1" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="block text-base px-2 pt-2 pb-1 bg-black border-b-2 border-b-slate-700 focus:border-b-white focus:outline-1 focus:outline-offset-8 shadow-lg transition-all"
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        name={name}
      ></textarea>
    </div>
  );
}

TextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};
