import React from "react";
import PropTypes from "prop-types";

interface TextInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: any;
  name: string;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChange,
  name,
}: TextInputProps): JSX.Element {
  return (
    <div className="relative text-input-group ease-in-out transition-all p-2 m-2 justify-center">
      <label className="transition-all p-1">
        {label}
        <input
          className="block text-base px-2 pt-2 pb-1 bg-black border-b-2 border-b-slate-700 focus:border-b-white focus:outline-1 focus:outline-offset-4 shadow-lg transition-all mt-2"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        ></input>
      </label>
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
