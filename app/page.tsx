"use client";

import Image from "next/image";
import TextInput from "@/components/TextInput";
import { FormEvent, use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputGroup from "@/components/InputGroup";

interface FieldObject {
  fieldName: string;
  fieldValue: string;
}

class FieldObject {
  constructor(fieldName: string, fieldValue: string) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
  }
}

export default function Home() {
  const [userInput, setUserInput] = useState(Array<FieldObject>);
  const [controlledInput, setControlledInput] = useState({email: ""})

  useEffect(() => {
    retrieveStorage();
  }, []);

  useEffect(() => {
    console.log("UE")
  }, [controlledInput])

  function controlledInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target
    setControlledInput({...controlledInput, [target.name]: target.value})
  }

  function onChange(e: React.ChangeEvent, index: number) {
    const target = e.target;
    const newUserInput: Array<FieldObject> = userInput;
    newUserInput[index][target.name as keyof FieldObject] = target.value;
    setUserInput(newUserInput);
  }

  function addNewField() {
    setUserInput([...userInput, new FieldObject("", "")]);
  }

  function removeField(index: number) {
    const newUserInput: Array<FieldObject> = userInput;
    newUserInput.splice(index, 1);
    setUserInput([...newUserInput]);
  }

  function retrieveStorage() {
    const storedObject = localStorage.getItem("currentObject");
    setUserInput(
      storedObject ? JSON.parse(storedObject) : [new FieldObject("", "")]
    );
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.setItem("currentObject", JSON.stringify(userInput));
  }

  function autoSave() {
    const interval = 5000
    setInterval()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={onSubmit}>
        {userInput.map((element, index) => (
          <InputGroup
            key={uuidv4()}
            id={index}
            onChange={(e: React.ChangeEvent) => onChange(e, index)}
            onClick={() => removeField(index)}
            inputValue={element.fieldName}
            textAreaValue={element.fieldValue}
          />
        ))}
        <button type="button" onClick={addNewField}>
          + Add New Field
        </button>
        <br />
        <button type="submit">Save</button>
      </form>
      <input value={controlledInput.email} name="email" onChange={e => controlledInputHandler(e)} />
    </main>
  );
}
