import { useEffect, useContext } from "react";
import {
  deleteTrashedNotes,
  restoreTrashedNotes,
  getTrashedNotes,
} from "../utils/useNotes";
import parse from "html-react-parser";
import userContext from "../utils/userContext.js";
import { useNavigate } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import { ToastContainer } from "react-toastify";

const tooltipStyle = {
  backgroundColor: "#717370",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "2px 4px",
};

const Trash = () => {
  const { user, setNotes, trashedNotes, setTrashedNotes } =
    useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    getTrashedNotes(setTrashedNotes);
  }, []);

  const handleToast = (toastInput) => {
    toastInput();
  };

  if (!user.isLoggedIn) return <h1>You are not logged in</h1>;
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} />
      <Tooltip
        anchorSelect=".delete-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        delete forever
      </Tooltip>

      <Tooltip
        anchorSelect=".restore-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        restore
      </Tooltip>

      {trashedNotes.length === 0 ? (
        <h1>No Notes to display</h1>
      ) : (
        <div className="flex flex-col items-center m-4 p-4 min-w-[80%]">
          {trashedNotes.map((note, index) => {
            return (
              <div
                className="m-2 border-2 border-gray-200 hover:shadow-md p-4 w-full max-w-[60%] min-h-[140px] rounded-md flex flex-col"
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
                    className="delete-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 
                    hover:rounded-full p-2 "
                    onClick={() => {
                      deleteTrashedNotes(
                        note._id,
                        setTrashedNotes,
                        handleToast
                      );
                    }}
                  />

                  <FontAwesomeIcon
                    icon={icon({
                      name: "trash-arrow-up",
                    })}
                    size="lg"
                    className="restore-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 
                    hover:rounded-full p-2 "
                    onClick={() => {
                      restoreTrashedNotes(
                        note._id,
                        setNotes,
                        setTrashedNotes,
                        handleToast
                      );
                      // navigate("/notes");
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

export default Trash;
