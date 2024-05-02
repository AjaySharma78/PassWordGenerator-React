import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

function Self() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");
  const passRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    pass = Math.random().toString(36).substring(2, length);
    setPassword(pass);
  }, [length, setPassword]);

  const copyPass = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy("copied");
    setTimeout(() => {
      setCopy("copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, passwordGen]);
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
              max={20}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range">Length:{length - 2}</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Self;
