import { useEffect, useState } from "react";
import { useContext } from "react";
import userContext from "../utils/userContext";
import {
  getUserNotes,
  addUserNotes,
  deleteUserNotes,
  addArchiveNotes,
  addTrashNotes,
} from "../utils/useNotes.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import NoteModal from "./NoteModal.js";
import Note from "./Note.js";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["bold", "italic", "underline", "strike"],
    ["clean"],
  ],
};

const Notes = () => {
  const {
    user,
    notes,
    setNotes,
    noteId,
    setNoteId,
    note,
    setArchivedNotes,
    setTrashedNotes,
  } = useContext(userContext);

  const [noteInput, setNoteInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { editNoteId, deleteNoteId, archiveNoteId, trashNoteId } = noteId;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => getUserNotes(setNotes), 200);
  }, []);

  if (!user.isLoggedIn) return <h1>You are not logged in</h1>;
  return (
    <div className="flex flex-col items-center">
      <NoteModal
        showmodal={showModal}
        setShowModal={setShowModal}
        note={note}
        notes={notes}
        setNotes={setNotes}
        noteId={editNoteId}
      />
      <div className="note-input flex justify-around items-center m-4">
        <ReactQuill
          className="shadow-md"
          theme="snow"
          modules={modules}
          placeholder="Write Something"
          onChange={setNoteInput}
        />
      </div>

      <button
        className="bg-teal-600 font-bold text-white self-center py-1 px-2 rounded-md my-4"
        onClick={() => addUserNotes(setNotes, { ...note, content: noteInput })}
      >
        Add Note
      </button>

      {notes.length === 0 ? (
        <h1>"No Notes to Display"</h1>
      ) : (
        <div className="flex flex-col items-center m-4 p-4 min-w-[80%]">
          {notes.map((note, index) => {
            return (
              <div
                className="m-2 border-2 border-gray-200 hover:shadow-md p-4 w-full max-w-[60%] min-h-[120px] rounded-md flex flex-col"
                key={index}
              >
                <h1>
                  {note.content.length === 0
                    ? "Empty Note"
                    : parse(note.content)}
                </h1>
                <div className="flex justify-end mt-auto">
                  <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg"
                    onClick={() => {
                      setShowModal(true);
                      setNoteId({ ...noteId, editNoteId: note._id });
                    }}
                  >
                    edit
                  </button>
                  <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      deleteUserNotes(note._id, setNotes);
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      // navigate("/archive");
                      addArchiveNotes(
                        note._id,
                        note,
                        setNotes,
                        setArchivedNotes
                      );
                    }}
                  >
                    archive
                  </button>
                  <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      addTrashNotes(note._id, setNotes, setTrashedNotes);
                    }}
                  >
                    trash
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notes;
