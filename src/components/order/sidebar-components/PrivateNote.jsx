import React, { useEffect, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  useDeleteNoteByIdMutation,
  useLazyGetNoteDataQuery,
} from "../../../Redux/api/orderApiSlice";
import AddNoteModal from "./AddNoteModal";
import EditNoteModal from "./EditNoteModal";

const PrivateNote = () => {
  const { projectDetails } = useSelector((state) => state.order);

  const [getNotesData, { data: notes }] = useLazyGetNoteDataQuery();
  const [deleteANote] = useDeleteNoteByIdMutation();
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState(null);

  useEffect(() => {
    if (projectDetails) {
      getNotesData({ orderId: projectDetails?.id });
    }
  }, [projectDetails, getNotesData]);

  const handleDeleteNote = async (orderId, noteId) => {
    console.log("Order Id", orderId, "Note Id", noteId);
    try {
      await deleteANote({ orderId, noteId }).unwrap();
    } catch {
      console.log("Note Delete Failed");
    }
  };

  return (
    <div className="bg-lightskyblue p-3">
      <div className="flex items-center justify-between gap-1">
        <h1 className="text-lg font-semibold">Private Note</h1>
        {projectDetails?.projectStatus !== "Completed" &&
          projectDetails?.projectStatus !== "Canceled" && (
            <button
              onClick={() => setAddNoteModal(true)}
              className="text-lg font-semibold text-primary duration-300 hover:underline"
            >
              Add New
            </button>
          )}
      </div>
      <div className="mb-1 mt-5 space-y-4">
        {notes?.map((note, idx) => (
          <div key={idx} className="flex items-center justify-between gap-1">
            <h2 className="text-base" title={note?.content?.note}>
              {note?.content?.title}
            </h2>
            {projectDetails?.projectStatus !== "Completed" &&
              projectDetails?.projectStatus !== "Canceled" && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditNoteModal(note)}
                    className="text-base text-gray-500"
                  >
                    <LiaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note?.orderId, note?.id)}
                    className="text-base text-gray-500"
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
              )}
          </div>
        ))}
      </div>
      {addNoteModal && (
        <AddNoteModal handleClose={() => setAddNoteModal(false)} />
      )}
      {editNoteModal && (
        <EditNoteModal
          handleClose={() => setEditNoteModal(false)}
          value={editNoteModal}
        />
      )}
    </div>
  );
};

export default React.memo(PrivateNote);
