import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";

const PrivateNote = () => {
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(null);

  const [notes, setNotes] = useState([
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
  ]);

  const handleAddNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

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
      <div className="mb-1 mt-5 space-y-4">
        {notes?.map((note, idx) => (
          <div key={idx} className="flex items-center justify-between gap-1">
            <h2 className="text-base">{note?.title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditNoteModal(note)}
                className="text-base text-gray-500"
              >
                <LiaEdit />
              </button>
              <button className="text-base text-gray-500">
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))}
      </div>
      {addNoteModal && (
        <AddNoteModal
          handleClose={() => setAddNoteModal(false)}
          onNoteSubmit={handleAddNote}
        />
      )}
      {editNoteModal && (
        <EditNoteModal
          handleClose={() => setEditNoteModal(false)}
          value={editNoteModal}
          //   onNoteSubmit={handleAddNote}
        />
      )}
    </div>
  );
};

export default PrivateNote;
