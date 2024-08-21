"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputGroup from "@/components/InputGroup";

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


// TODO: Add 'locked' boolean to persist locked status
class FieldObject {
  constructor(fieldName: string, fieldValue: string) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.key = uuidv4();
  }
}

export default function Home() {
  const [userInput, setUserInput] = useState(Array<FieldObject>);
  const [showModal, setShowModal] = useState(false);
  const [overwrite, setOverwrite] = useState(false);
  const timeoutInterval = 5000;
  // TODO: Probably switch this to a ref
  let timer: number;
  const overWriteIndex = useRef(-1);

  // Populates initial values
  // TODO: Loading screen or something promises would be useful here
  useEffect(() => {
    retrieveStorage();
  }, []);

  // Handles user typing in the inputs and text area
  function onChange(e: React.ChangeEvent<HTMLTextElements>, index: number) {
    const target = e.target;
    const newUserInput: Array<FieldObject> = userInput;
    newUserInput[index][target.name] = target.value;
    setUserInput([...newUserInput]);
  }

  // Adds new fieldObject to the userInput state
  function addNewField() {
    setUserInput([...userInput, new FieldObject("", "")]);
  }

  // Retrieves currentObject from local storage TODO: Retrieve the overall JSON object from local storage
  function retrieveStorage() {
    const storedObject = localStorage.getItem("currentObject");
    setUserInput(
      storedObject ? JSON.parse(storedObject) : [new FieldObject("", "")]
    );
  }

  // Handles the user pressing the 'Save' button
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (overWriteIndex.current !== -1) {
      setShowModal(true);
      overWriteIndex.current = -1
    } else {
      saveCurrentObject();
      saveData(false);
    }
  }

  // Saves userInput to local storage as 'currentObject'
  function saveCurrentObject() {
    localStorage.setItem("currentObject", JSON.stringify(userInput));
  }

  // TODO: MAKE SURE ID STAYS THE SAME
  function saveData(overwrite: boolean) {
    const entries = JSON.parse(localStorage.getItem("entries") || "[]");
    const formattedObject = {
      id: uuidv4(),
    };

    // Adds properties to the formatted object by iterating over the userInput state variable
    for (const element of userInput) {
      formattedObject[element.fieldName] = element.fieldValue;
    }

    // TODO: Add validation to check that the entry does not already exist

    if (overwrite) {
      // If this doesn't work use toSpliced()
      entries[overWriteIndex.current] = formattedObject;
      setShowModal(false)
    } else {
      entries.push(formattedObject);
    }
    localStorage.setItem("entries", JSON.stringify(entries));
  }

  // Clears the autosave timeout when the user types inside the form tag
  function onKeyDown() {
    window.clearTimeout(timer);
  }

  // Clears then creates a timeout that autosaves the users work after they stop typing and the timeout runs out
  function onKeyUp() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      saveCurrentObject();
    }, timeoutInterval);
  }

  // Function for testing overwrite
  function changeOverwriteIndex() {
    overWriteIndex.current = 1;
  }

  // TODO: Create a function to clear out fieldValues out of the fieldObjects in userInput
  function clearValues() {}

  // Componentize Modal
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showModal && (
        <div>
          <p>Do you want to overwrite the original object?</p>
          <button type="button" onClick={() => saveData(true)}>Yes</button>
          <button type="button" onClick={() => saveData(false)}>No</button>
        </div>
      )}
      <form onSubmit={onSubmit} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
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

        <button className="p-2" type="button" onClick={changeOverwriteIndex}>
          Change overWriteIndex
        </button>
      </form>
    </main>
  );
}
