import { useEffect, useContext } from "react";
import {
  deleteTrashedNotes,
  restoreTrashedNotes,
  getTrashedNotes,
} from "../utils/useNotes";
import parse from "html-react-parser";
import userContext from "../utils/userContext.js";
import { useNavigate } from "react-router-dom";

const Trash = () => {
  const { user, setNotes, trashedNotes, setTrashedNotes } =
    useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    getTrashedNotes(setTrashedNotes);
  }, []);

  if (!user.isLoggedIn) return <h1>You are not logged in</h1>;
  return (
    <>
      {trashedNotes.length === 0 ? (
        <h1>No Notes to display</h1>
      ) : (
        <div className="flex flex-col items-center m-4 p-4 min-w-[80%]">
          {trashedNotes.map((note, index) => {
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
                      deleteTrashedNotes(note._id, setTrashedNotes);
                    }}
                  >
                    delete
                  </button>
                  <button
                    className="bg-teal-600 text-white font-bold px-2 rounded-md hover:shadow-lg ml-2"
                    onClick={() => {
                      restoreTrashedNotes(note._id, setNotes, setTrashedNotes);
                      // navigate("/notes");
                    }}
                  >
                    restore
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

export default Trash;
