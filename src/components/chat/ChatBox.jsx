import { useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosAttach,
  IoMdClose,
} from "react-icons/io";
import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutSideClick";
import Divider from "../Divider";
import AddQuickMsgModal from "./AddQuickMsgModal";
import EditQuickMsgModal from "./EditQuickMsgModal";
import EmojiPicker from "./EmojiPicker";
import { useLocalStorageObject } from "../../hooks/useLocalStorageObject";

const ChatBox = () => {
  const [{quickResponse}, updateItem] = useLocalStorageObject('utils', { quickResponse: false});
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "ADMIN";
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);

  const [quickMsgs, setQuickMsgs] = useState([
    {
      id: 1,
      title: "Thank you",
      text: "Thank you very much for choosing my service!",
    },
  ]);
  // Selected Images Handler
  const handleChangeSelectedImage = (e) => {
    const imagesArr = Array.from(e.target.files);
    setSelectedImages(imagesArr);
  };

  // Quick Messages Handlers
  const handleQuickMsgs = (id) => {
    setQucikMsgBtnController(qucikMsgBtnController === id ? null : id);
  };
  const handleAddQuickMsg = (msg) => {
    const maxId =
      quickMsgs.length > 0
        ? Math.max(...quickMsgs.map((item) => item.id)) + 1
        : 1;
    const newMsg = { id: maxId, ...msg };
    setQuickMsgs((prevMsg) => [...prevMsg, newMsg]);
  };
  const handleUpdateQuickMsg = (msg) => {
    setQuickMsgs((prevMsg) => prevMsg.map((v) => (v.id === msg.id ? msg : v)));
  };
  const handleDeleteQuickMsg = (id) => {
    setQuickMsgs((prevMsg) => prevMsg.filter((v) => v.id !== id));
  };

  // input handling
  const [textValue, setTextValue] = useState("");
  const textareaRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    // Insert the emoji at the cursor position
    const newText =
      textValue.substring(0, startPos) +
      emoji +
      textValue.substring(endPos, textValue.length);

    setTextValue(newText);

    // Move the cursor position after the emoji
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
      textarea.focus();
    }, 0);
  };

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };
  const handleResetImages = () => {
    // Clear the state
    setSelectedImages([]);

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useOutsideClick(menuRef, () => setQucikMsgBtnController(null));  

  return (
    <div className="h-full">
      {/* Header Part */}
      <div className="flex h-[70px] items-center justify-between bg-[#efefef] p-4">
        <div className="">
          <h1 className="text-lg font-semibold">clientusername</h1>
          <div className="flex items-center gap-3 text-sm">
            <p>Last seen: 18 hours ago</p>
            <Divider className={"h-[15px] w-[2px] !bg-black/50"} />
            <p>Local time: 1:10 PM, May 29, 2023</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-slate-300 text-xs font-semibold">
            3
          </div>
          <button type="button">
            <BsThreeDotsVertical className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Conversation Field */}
      <div
        className={`${quickResponse ? "h-[calc(100%_-_350px)]" : "h-[calc(100%_-_250px)]"} overflow-y-auto p-5`}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          labore maxime voluptate repudiandae illum ratione sunt deleniti
          officiis itaque quod rem ad incidunt vitae voluptatibus error laborum
          impedit dolorum quo, inventore natus, saepe quis quasi. Rem quisquam
          aliquam vero dolorem aut provident saepe architecto a eum? Architecto
          expedita sapiente voluptates fuga ex consectetur asperiores,
          doloremque repellendus amet, exercitationem necessitatibus aspernatur!
          Laudantium soluta sapiente doloremque, repellendus impedit saepe
          illum, eaque eveniet expedita nam, architecto ut necessitatibus
          voluptatum commodi labore. Illo nemo excepturi quas. Repellendus
          soluta dolore maiores dicta? Doloribus sit tempore sequi repudiandae
          ratione provident ab perspiciatis, nam, debitis, ipsam aliquid?
        </p>
      </div>
      {/* Text Field Part */}
      <div className={`${quickResponse ? "h-[280px]" : "h-[180px]"} px-3`}>
        <div className="rounded-t-md border border-b border-slate-300">
          <div
            className={`${quickResponse ? "h-[140px]" : "h-[40px]"} border-b border-slate-300 p-2`}
          >
            <div className="flex items-center gap-3 font-semibold">
              Quick Response{" "}
              <button
                type="button"
                className="bg-transparent"
                onClick={() => updateItem("quickResponse",!quickResponse)}
              >
                {quickResponse ? (
                  <IoIosArrowDown className="text-xl text-primary" />
                ) : (
                  <IoIosArrowUp className="text-xl text-primary" />
                )}
              </button>
            </div>
            <div
              className={`${quickResponse ? "block" : "hidden"} flex h-[100px] flex-wrap items-start gap-3 overflow-y-auto py-2`}
            >
              {quickMsgs.map((msg, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-2 border border-gray-400 px-2 py-1 text-xs hover:bg-primary/10"
                >
                  <button type="button">{msg.title}</button>
                  <button
                    type="button"
                    onClick={() => handleQuickMsgs(msg.id)}
                    // onBlur={(e) => {
                    //   e.preventDefault();
                    //   setQucikMsgBtnController(null);
                    // }}
                  >
                    <IoIosArrowDown className="text-base text-gray-400" />
                  </button>
                  {qucikMsgBtnController === msg.id && (
                    <div
                      className="absolute top-full z-10 rounded-lg border border-solid bg-white py-2 text-center *:block *:p-[5px_15px]"
                      ref={menuRef}
                    >
                      <button
                        type="button"
                        className="w-full text-xs hover:bg-gray-200"
                        onClick={() => setOpenEditMsgModal(msg)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuickMsg(msg.id)}
                        className="w-full text-xs hover:bg-gray-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2 border border-gray-400 px-2 py-1 text-xs hover:bg-primary/10">
                <button type="button" onClick={() => setOpenAddMsgModal(true)}>
                  + Add New
                </button>
              </div>
              {openEditMsgModal && (
                <EditQuickMsgModal
                  handleClose={setOpenEditMsgModal}
                  onMsgSubmit={handleUpdateQuickMsg}
                  value={openEditMsgModal}
                />
              )}
              {openAddMsgModal && (
                <AddQuickMsgModal
                  handleClose={setOpenAddMsgModal}
                  onMsgSubmit={handleAddQuickMsg}
                />
              )}
            </div>
          </div>
          <textarea
            name=""
            className="block h-[90px] w-full resize-none p-3 outline-none"
            placeholder="Type a message..."
            ref={textareaRef}
            value={textValue}
            onChange={handleTextChange}
          ></textarea>
          <div className="flex h-[50px] items-center justify-between border-t border-slate-300">
            <div className="flex items-center gap-3 pl-3">
              {/* <button type="button">
                <FaThumbsUp className="text-2xl text-yellow-400" />
              </button> */}
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              <Divider className={"h-[30px] w-px !bg-gray-400"} />
              <div>
                <input
                  type="file"
                  multiple
                  id="select-images"
                  hidden
                  onChange={handleChangeSelectedImage}
                  ref={fileInputRef}
                />
                <label htmlFor="select-images" className="cursor-pointer">
                  <IoIosAttach className="text-2xl" />
                </label>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  className="bg-lightskyblue px-2 py-1 text-sm font-medium"
                >
                  Create an Offer
                </button>
              )}
              {selectedImages.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  {selectedImages.length} file selected{" "}
                  <button onClick={handleResetImages}>
                    <IoMdClose className="text-lg" />
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="flex h-full w-[120px] items-center justify-center bg-primary font-semibold text-white"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
