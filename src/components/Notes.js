import { useEffect, useState } from "react";
import { useContext } from "react";
import userContext from "../utils/userContext";
import { getUserNotes, addUserNotes } from "../utils/useNotes.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

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
  const { user, setUser } = useContext(userContext);
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [note, setNote] = useState({
    id: "",
    content: "",
  });
  // console.log(noteInput);
  useEffect(() => {
    setTimeout(() => getUserNotes(setNotes), 1000);
  }, []);

  if (!user.isLoggedIn) return <h1>You are not logged in</h1>;
  return (
    <div className="flex flex-col items-center">
      <div className="note-input flex justify-around items-center m-4">
        {/* <input
          type="text"
          className="border-2 border-slate-500"
          placeholder="title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <input
          type="text"
          className="border-2 border-slate-500"
          placeholder="body"
          value={note.body}
          onChange={(e) => setNote({ ...note, body: e.target.value })}
        /> */}

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
        <div className="flex flex-col items-center border-2 m-4 p-4">
          {notes.map((note, index) => {
            return (
              <div className="m-2 border-2 border-black p-4 w-full" key={index}>
                <h1>
                  {note.content.length === 0
                    ? "Empty Note"
                    : parse(note.content)}
                </h1>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notes;
