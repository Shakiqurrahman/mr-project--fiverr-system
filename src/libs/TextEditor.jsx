import React, { useState, useRef } from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

const TextEditor = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const handleInputChange = () => {
    setContent(editorRef.current.innerHTML);
    console.log(editorRef.current.innerHTML);
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
    handleInputChange(); // Update state immediately after command execution
  };

  return (
    <div className="p-4">
      <div className="flex justify-start items-center mb-2">
        <button
          className="p-2 hover:bg-gray-200"
          onClick={(e) => {
            e.preventDefault();
            formatText("bold");
          }}
        >
          <FaBold />
        </button>
        <button
          className="p-2 hover:bg-gray-200"
          onClick={(e) => {
            e.preventDefault();
            formatText("italic");
          }}
        >
          <FaItalic />
        </button>
        <button
          className="p-2 hover:bg-gray-200"
          onClick={(e) => {
            e.preventDefault();
            formatText("underline");
          }}
        >
          <FaUnderline />
        </button>
      </div>
      <div
        ref={editorRef}
        className="border p-4 rounded h-48 overflow-auto"
        contentEditable
        style={{
          direction: 'rtl', // Right-to-left direction
          textAlign: 'left', // Align text to the left side
          unicodeBidi: 'plaintext' // Ensure text is typed and aligned correctly
        }}
        onInput={handleInputChange}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default TextEditor;
