import ReactQuill from "react-quill";
import { updateUserNotes } from "../utils/useNotes";
import { useEffect, useState } from "react";

const NoteModal = ({
  showmodal,
  setShowModal,
  note,
  notes,
  setNotes,
  noteId,
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

  const [editedNote, setEditedNote] = useState("");

  const handleSaveClick = () => {
    // console.log(editedNote);
    updateUserNotes(noteId, { ...note, content: editedNote });
    setShowModal(false);
  };

  return (
    <>
      {showmodal ? (
        <div className="fixed left-0 right-0 top-0 bottom-0 z-[9999] bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
          <div className="note-modal border-2 border-black bg-white w-[800px] min-h-[100px] flex flex-col p-2">
            {notes.map((note, index) => {
              if (noteId === note._id) {
                return (
                  <ReactQuill
                    key={index}
                    theme="snow"
                    modules={modules}
                    defaultValue={note.content}
                    onChange={setEditedNote}
                  />
                );
              }
            })}

            <div className="mt-4 flex pr-1 pl-1">
              <button onClick={() => handleSaveClick()}>Save</button>
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
