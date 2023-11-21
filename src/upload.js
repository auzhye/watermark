import React, { useState, useEffect, createContext } from 'react';
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";
import Renderer from './renderer';

const uploader = Uploader({
  apiKey: "free", // Get production API keys from Bytescale
  mimeTypes: ["image/jpeg", "image/webp", "image/png", "image/heic", "image/svg+xml"],
});


export const Context = createContext("");

const options = { multi: false };
const Upload = function() {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
   setResult(result.replace("/raw/", "/image/"));
   console.log(result);
  },[result]);
  useEffect(() => { setInput(input);}, [input] )
  return (
    <section className="w-full min-h-screen h-full bg-white text-black">
      <div className="relative h-full p-5 lg:px-20 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full min-h-screen md:w-1/2 p-5 md:px-0 mx-5 flex justify-center items-center">
          <div className="bg-white border border-black rounded-md w-full lg:w-1/2 h-full p-5 pt-8 ">
           <Context.Provider value={{input, result}}>
            <h3 className="text-2xl font-semibold mb-5">
            Image Watermark
            </h3>
            <div className="flex flex-col gap-3">
              <input className="border border-black" type="text" placeholder="Input a watermark word" value={input} onChange={(e => setInput(e.target.value))} />
              <UploadButton style={{width:""}} uploader={uploader}
                options={options}
                onComplete={(files) => {setResult(files.map(x => x.fileUrl).join("\n")); }}
              >
                {({ onClick }) =>
                  <button onClick={onClick} className="bg-sky-500 border rounded-md px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-sky-600 text-white text-xl cursor-pointer">
                    Upload a file...
                  </button>
                }
              </UploadButton>
            </div>

              {result ? <Renderer links={result} /> : null}
            </Context.Provider>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Upload;