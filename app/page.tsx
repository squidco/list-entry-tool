"use client";

import Image from "next/image";
import TextInput from "@/components/TextInput";
import { useState } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState({});

  function onChange(e: Event) {
    const target: EventTarget = e.target;
    setUserInput({ ...userInput, [target.name]: target.value });
  }

  function onSubmit() {}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <TextInput
          id={"newInput"}
          label={"hello"}
          placeholder={"brother"}
          // value={""}
          onChange={onChange}
          name="bullshit"
        />
        <TextInput
          id={"stupid"}
          label={"shart"}
          placeholder={"asd"}
          // value={""}
          onChange={onChange}
          name="shart"
        />
      </form>
    </main>
  );
}
