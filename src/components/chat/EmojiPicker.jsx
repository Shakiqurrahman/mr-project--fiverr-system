import data from "@emoji-mart/data"; // Emoji-mart data
import Picker from "@emoji-mart/react"; // Note the updated import for v4+
import React, { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const EmojiPicker = ({ onEmojiSelect, emojiSize, style }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState("👍");
  const pickerRef = useRef(null);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji.native);
    setEmoji(emoji.native);
    setShowPicker(false);
  };

  useOutsideClick(pickerRef, togglePicker);

  return (
    <div className="relative h-full">
      <button
        type="button"
        onClick={togglePicker}
        className={emojiSize ? emojiSize : "text-2xl"}
      >
        {emoji}
      </button>

      {showPicker && (
        <div
          ref={pickerRef}
          style={style}
          className="emoji-picker-block absolute bottom-full z-10 mt-2 w-[320px] rounded-lg border border-gray-300 bg-white p-2 shadow-lg"
        >
          <style>
            {`em-emoji-picker {
              width: 100% !important;
            }`}
          </style>
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            previewPosition="none"
            dynamicWidth={true}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
