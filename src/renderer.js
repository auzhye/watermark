import React, { useState, useEffect, useContext } from 'react';
import JsFileDownloader from 'js-file-downloader';
import { Context } from './upload';
import "./index.css";
const Renderer = (prop) => {
  const handleDownload = (url) => {
   new JsFileDownloader({ 
    url: url
  })
  .then(function (res) {
    // Called when download ended
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  const {input, result} = useContext(Context);
  const [alter, alterChange] = useState("Watermark");
  useEffect(() => {
    if (input && input !== " ") {
      alterChange(input);
    }
  }, [input]);
  return (
    <>
      <img height="400px" width="auto" src={input ? prop.links + `?padding=10&font-size=350&repeat=true&layer-rotate=45&layer-opacity=30&q=80&text=${input}` : prop.links + `?padding=10&font-size=350&repeat=true&layer-rotate=45&layer-opacity=30&q=80&text=${alter}`} alt={alter} />
      <div className="flex justify-center items-center hover:text-white -500 p-2">
        <button className="bg-sky-500 border rounded-md px-4 py-2 transition duration-50 focus:outline-none font-semibold hover:bg-sky-600 text-white text-xl cursor-pointer" onClick={() => {
          handleDownload(input ? prop.links + `?padding=10&font-size=350&repeat=true&layer-rotate=45&layer-opacity=30&q=80&text=${input}` : prop.links + `?padding=10&font-size=350&repeat=true&layer-rotate=45&layer-opacity=30&q=80&text=${alter}`)
        }}>Download Image</button>
      </div>

    </>
  );
}
export default Renderer;