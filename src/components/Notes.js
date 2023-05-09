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
import { Tooltip } from "react-tooltip";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const tooltipStyle = {
  backgroundColor: "#717370",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "2px 4px",
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
  const { editNoteId } = noteId;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => getUserNotes(setNotes), 200);
  }, []);

  if (!user.isLoggedIn) {
    return <h1>You are not logged in</h1>;
  }

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

      <Tooltip
        anchorSelect=".edit-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        edit
      </Tooltip>

      <Tooltip
        anchorSelect=".archive-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        archive
      </Tooltip>

      <Tooltip
        anchorSelect=".trash-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        trash
      </Tooltip>

      <Tooltip
        anchorSelect=".color-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        color
      </Tooltip>

      <button
        className="bg-teal-600 font-bold  text-white self-center py-1 px-2 rounded-md my-4"
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
                className="m-2 border-2 border-gray-200 hover:shadow-md px-4 pt-4 w-full max-w-[60%] min-h-[140px] rounded-md flex flex-col"
                key={index}
              >
                <h1>
                  {note.content.length === 0
                    ? "Empty Note"
                    : parse(note.content)}
                </h1>
                <div className="flex justify-end items-center mt-auto py-2">
                  <FontAwesomeIcon
                    icon={icon({
                      name: "pen-to-square",
                      style: "regular",
                    })}
                    size="lg"
                    className="edit-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer
                  hover:bg-gray-200 hover:rounded-full p-2"
                    onClick={() => {
                      setShowModal(true);
                      setNoteId({ ...noteId, editNoteId: note._id });
                    }}
                  />

                  {/* <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      deleteUserNotes(note._id, setNotes);
                    }}
                  >
                    delete
                  </button> */}
                  <FontAwesomeIcon
                    icon={icon({
                      name: "box-archive",
                    })}
                    size="lg"
                    className="archive-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer 
                    hover:bg-gray-200 hover:rounded-full p-2"
                    onClick={() => {
                      // navigate("/archive");
                      addArchiveNotes(
                        note._id,
                        note,
                        setNotes,
                        setArchivedNotes
                      );
                    }}
                  />

                  <FontAwesomeIcon
                    icon={icon({
                      name: "trash-can",
                      style: "regular",
                    })}
                    size="lg"
                    className="trash-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer 
                    hover:bg-gray-200 hover:rounded-full p-2 "
                    onClick={() => {
                      addTrashNotes(note._id, setNotes, setTrashedNotes);
                    }}
                  />

                  <FontAwesomeIcon
                    icon={icon({
                      name: "palette",
                    })}
                    size="lg"
                    className="color-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer 
                  hover:bg-gray-200 hover:rounded-full p-2"
                  />
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
