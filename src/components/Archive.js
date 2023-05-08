import { useEffect, useContext } from "react";
import {
  getArchivedNotes,
  restoreArchivedNotes,
  deleteArchivedNote,
} from "../utils/useNotes";
import parse from "html-react-parser";
import userContext from "../utils/userContext.js";
import { useNavigate } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                  <FontAwesomeIcon
                    icon={icon({
                      name: "trash-can",
                      style: "regular",
                    })}
                    size="lg"
                    className="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 
                    hover:rounded-full p-2 "
                    onClick={() => {
                      deleteArchivedNote(note._id, setArchivedNotes);
                    }}
                  />

                  <FontAwesomeIcon
                    icon={icon({
                      name: "boxes-packing",
                    })}
                    size="lg"
                    className="text-gray-500 ml-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 
                    hover:rounded-full p-2"
                    onClick={() => {
                      restoreArchivedNotes(
                        note._id,
                        setNotes,
                        setArchivedNotes
                      );
                      //   navigate("/notes");
                    }}
                  />
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
