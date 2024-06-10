import { React, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // code is variable that stores code content of text area
  // setCode is used to change the content of the text area
  // ("") is the default content it will start with
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async () => {
    // create payload object that we'll send along with the request
    const payload = {
      language: "cpp",
      code,
    };

    try {
      const { data } = await axios.post("http://localhost:7500/run", payload);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <h1>Online Code Compiler</h1>
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        // onChange = {() => {}} we create an anonymous arrow function where we will get event object (whenever the code changes we will get e as a parameter) which will use setCode(e.target.value) (this will be the text content of text area which will be used to set code)
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;

// note: on the local host if we send request from one port to another it will be blocked by default, due to the CORS policy (cross origin resource sharing policy). Hence we have to enable it from the backend. (must be resolved at the backend not the fault of the frontend)
