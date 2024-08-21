import React, { useState } from "react";
import TextField from "./TextField";
import TextInput from "./TextInput";

interface InputGroupProps {
  onChange: any;
  onClick: any;
  inputValue: string;
  textAreaValue: string;
}

export default function InputGroup({
  onChange,
  onClick,
  inputValue,
  textAreaValue,
}: InputGroupProps): JSX.Element {
  const [lockName, setLockName] = useState(false);

  return (
    <div className="flex">
      {lockName ? (
        <p>{inputValue}</p>
      ) : (
        <TextInput
          label="Field Name"
          placeholder="Cat Sounds"
          name="fieldName"
          onChange={onChange}
          value={inputValue}
        />
      )}
      <button type="button" onClick={(e) => setLockName(!lockName)}>
        Lock Name
      </button>
      <TextField
        label="Field Value"
        placeholder="meow purr"
        onChange={onChange}
        name="fieldValue"
        value={textAreaValue}
      />
      <button type="button" onClick={onClick}>
        Remove
      </button>
    </div>
  );
}
