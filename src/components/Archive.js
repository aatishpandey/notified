import { useEffect, useContext } from "react";
import {
  getArchivedNotes,
  restoreArchivedNotes,
  deleteArchivedNote,
} from "../utils/useNotes";
import parse from "html-react-parser";
import userContext from "../utils/userContext.js";
import { useNavigate } from "react-router-dom";

const Archive = () => {
  const { user, setNotes, archivedNotes, setArchivedNotes } =
    useContext(userContext);
  //   const { archiveNoteId, deleteNoteId, editNoteId } = noteId;
  const navigate = useNavigate();

  useEffect(() => {
    getArchivedNotes(setArchivedNotes);
    // console.log(archivedNotes);
  }, []);

  if (!user.isLoggedIn) return <h1>You are not logged in</h1>;
  return (
    <>
      {archivedNotes.length === 0 ? (
        <h1>No Notes to display</h1>
      ) : (
        <div className="flex flex-col items-center m-4 p-4 min-w-[80%]">
          {archivedNotes.map((note, index) => {
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
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      deleteArchivedNote(note._id, setArchivedNotes);
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      restoreArchivedNotes(
                        note._id,
                        setNotes,
                        setArchivedNotes
                      );
                      //   navigate("/notes");
                    }}
                  >
                    Unarchive
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Archive;
