import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";

const PrivateNote = () => {
  const [addNoteModal, setAddNoteModal] = useState(false);

  const notes = [
    {
      id: 1,
      title: "Note 1",
      note: "Don't forget to attend our meeting tonight at 12 PM",
    },
    {
      id: 2,
      title: "Note 2",
      note: "Don't forget to attend our meeting tonight at 12 PM",
    },
  ];
  return (
    <div className="bg-lightskyblue p-3">
      <div className="flex items-center justify-between gap-1">
        <h1 className="text-lg font-semibold">Private Note</h1>
        <button
          onClick={() => setAddNoteModal(true)}
          className="text-lg font-semibold text-primary duration-300 hover:underline"
        >
          Add New
        </button>
      </div>
      <div className="my-5 space-y-6">
        {notes?.map((note) => (
          <div
            key={note.id}
            className="flex items-center justify-between gap-1"
          >
            <h2 className="text-sm">{note?.title}</h2>
            <div className="flex items-center gap-2">
              <button className="text-base text-gray-500">
                <LiaEdit />
              </button>
              <button className="text-base text-gray-500">
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivateNote;
