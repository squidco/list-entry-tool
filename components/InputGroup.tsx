import React, { useState } from "react";
import TextField from "./TextField";
import TextInput from "./TextInput";

interface InputGroupProps {
  onChange: any;
  onClick: any;
  id: number;
  inputValue: string;
  textAreaValue: string;
}

export default function InputGroup({ onChange, onClick, id, inputValue, textAreaValue }: InputGroupProps) {
  return (
    <div>
      <TextInput
        id={id.toString()}
        label="Field Name"
        placeholder="Cat Sounds"
        name="fieldName"
        onChange={onChange}
        value={inputValue}
      />
      <TextField
        id={id.toString()}
        label="Field Value"
        placeholder="meow purr"
        onChange={onChange}
        name="fieldValue"
        value={textAreaValue}
      />
      <button type="button" onClick={onClick}>Remove</button>
    </div>
  );
}
