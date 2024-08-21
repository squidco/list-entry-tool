"use client";

import Image from "next/image";
import TextInput from "@/components/TextInput";
import { FormEvent, use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputGroup from "@/components/InputGroup";
import { CLIENT_STATIC_FILES_RUNTIME_MAIN } from "next/dist/shared/lib/constants";
import { log, time } from "console";

// The same onChange is being used for an input and a textarea. Both share the common properties of name and value so this interface covers those
interface HTMLTextElements extends HTMLElement {
  name: string;
  value: string;
}

interface FieldObject {
  [index: string]: string;
  fieldName: string;
  fieldValue: string;
  key: string;
}

class FieldObject {
  constructor(fieldName: string, fieldValue: string) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.key = uuidv4();
  }
}

export default function Home() {
  const [userInput, setUserInput] = useState(Array<FieldObject>);
  const timeoutInterval = 5000;
  let timer: number;

  useEffect(() => {
    retrieveStorage();
  }, []);

  function onChange(e: React.ChangeEvent<HTMLTextElements>, index: number) {
    const target = e.target;
    const newUserInput: Array<FieldObject> = userInput;
    newUserInput[index][target.name] = target.value;
    setUserInput([...newUserInput]);
  }

  function addNewField() {
    setUserInput([...userInput, new FieldObject("", "")]);
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

  function saveData() {
    localStorage.setItem("currentObject", JSON.stringify(userInput));
  }

  function onKeyDown() {
    window.clearTimeout(timer);
  }

  function onKeyUp() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      saveData()
    }, timeoutInterval);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {userInput.map((element, index) => (
          <InputGroup
            key={element.key}
            onChange={(e: React.ChangeEvent<HTMLTextElements>) =>
              onChange(e, index)
            }
            onClick={() =>
              setUserInput(userInput.filter((el, i) => i !== index))
            }
            inputValue={element.fieldName}
            textAreaValue={element.fieldValue}
          />
        ))}
        <button type="button" onClick={addNewField}>
          + Add New Field
        </button>
        <br />
        <button className="p-2" type="submit">
          Save
        </button>
      </form>
    </main>
  );
}
