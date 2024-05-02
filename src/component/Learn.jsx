import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

function Learn() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");
  const passRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmopqrstuvwxyz";
    if (number) str += "01234567890";
    if (char) str += "!@#$%&*";

    for (let i = 0; i <= length; i++) {
      let character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }
    setPassword(pass);
  }, [length, char, number, setPassword]);

  const copyPass = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
    setCopy("copied");
    setTimeout(() => {
      setCopy("copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, number, char, passwordGen]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg py-4 px-4 my-8 text-white bg-gray-800">
        <h1>Password Generator</h1>
        <div className="flex outline-none shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="w-full outline-none  py-1 px-3 text-black"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button className="bg-cyan-400 px-3 " onClick={copyPass}>
            {copy}
          </button>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="range"
              className="cursor-pointer "
              value={length}
              min={8}
              max={30}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-2">
            {["Number", "Character"].map((items, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center items-center gap-x-1"
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    id={items === "Number" ? "number" : "character"}
                    defaultChecked={items === "Number" ? number : char}
                    onChange={() =>
                      items === "Number"
                        ? setNumber((prev) => !prev)
                        : setChar((prev) => !prev)
                    }
                  />
                  <label htmlFor={items === "Number" ? "number" : "character"}>
                    {items}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Learn;
