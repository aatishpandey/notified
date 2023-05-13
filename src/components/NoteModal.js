import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateUserNotes } from "../utils/useNotes";
import { useEffect, useState } from "react";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import ColorPallete from "./ColorPallete";

const tooltipPallete = {
  width: "max-content",
  minHeight: "40px",
  backgroundColor: "white",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  border: "1px solid gray",
  borderRadius: "10px",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "6px 6px",
  display: "flex",
  alignItems: "stretch",
};

const NoteModal = ({
  showmodal,
  setShowModal,
  note,
  notes,
  setNotes,
  noteId,
  currentNote,
}) => {
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
  // console.log(currentNote);
  const [editedNote, setEditedNote] = useState(currentNote.content);
  const [editColor, setEditColor] = useState(currentNote.noteBgColor);

  useEffect(() => setEditedNote(currentNote.content), [currentNote._id]);
  useEffect(() => setEditColor(currentNote.noteBgColor), [currentNote._id]);

  const handleSaveClick = () => {
    updateUserNotes(
      noteId,
      { ...note, content: editedNote, noteBgColor: editColor },
      setNotes
    );

    setShowModal(false);
  };

  return (
    <>
      {showmodal ? (
        <div
          className={`transition-all ease-in-out duration-1000 fixed left-0 right-0 top-0 bottom-0 z-[9999] bg-[rgba(0,0,0,0.4)] flex justify-center items-center`}
        >
          <div
            className={`transition-all ease-in-out duration-1000 note-modal border-2 border-black w-[800px] min-h-[100px] flex flex-col p-2 bg-${editColor}`}
          >
            {notes.map((note, index) => {
              if (noteId === note._id) {
                // setInitialContent(note.content);
                return (
                  <div className="flex flex-col" key={noteId}>
                    <Tooltip
                      anchorSelect=".color-btn"
                      style={tooltipPallete}
                      place="right"
                      noArrow
                      clickable={true}
                      openOnClick
                      // offset={2}
                    >
                      <ColorPallete setEditColor={setEditColor} />
                    </Tooltip>

                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      defaultValue={note.content}
                      onChange={setEditedNote}
                    />
                  </div>
                );
              }
            })}

            <div className="mt-4 flex pr-1 pl-1">
              <button onClick={() => handleSaveClick()}>Save</button>
              <FontAwesomeIcon
                icon={icon({
                  name: "palette",
                })}
                size="lg"
                className="animate-pulse color-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer 
                    hover:bg-gray-200 hover:rounded-full p-2 self-start"
              />
              <button className="ml-auto" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NoteModal;
