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
import { Tooltip } from "react-tooltip";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

const tooltipStyle = {
  backgroundColor: "#717370",
  color: "#FFFFFF",
  fontWeight: 600,
  padding: "2px 4px",
};

const Archive = () => {
  const {
    user,
    setNotes,
    archivedNotes,
    setArchivedNotes,
    showSideBar,
    setShowSideBar,
  } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    getArchivedNotes(setArchivedNotes);
  }, []);

  const handleToast = (toastInput) => {
    toastInput();
  };

  if (!user.isLoggedIn) return <h1>You are not logged in</h1>;
  return (
    <div className="archive-container flex justify-center">
      <Sidebar
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        user={user}
      />
      <ToastContainer />
      <Tooltip
        anchorSelect=".delete-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        delete
      </Tooltip>

      <Tooltip
        anchorSelect=".unarchive-btn"
        style={tooltipStyle}
        place="bottom"
        noArrow
        offset={2}
      >
        unarchive
      </Tooltip>

      {archivedNotes.length === 0 ? (
        <h1>No Notes to display</h1>
      ) : (
        <div className="flex flex-col items-center m-4 p-4 w-full md:w-[80%] ">
          {archivedNotes.map((note, index) => {
            return (
              <div
                className={`m-2 border-2 border-gray-200 text-sm sm:text-base hover:shadow-md px-4 pt-4 w-full      md:w-[65%] min-h-[135px] rounded-md flex flex-col overflow-hidden bg-${note.noteBgColor}`}
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
                      deleteArchivedNote(
                        note._id,
                        setArchivedNotes,
                        handleToast
                      );
                    }}
                  />

                  <FontAwesomeIcon
                    icon={icon({
                      name: "boxes-packing",
                    })}
                    size="lg"
                    className="unarchive-btn text-gray-500 ml-2 hover:text-gray-800 cursor-pointer hover:bg-gray-200 
                    hover:rounded-full p-2"
                    onClick={() => {
                      restoreArchivedNotes(
                        note._id,
                        setNotes,
                        setArchivedNotes,
                        handleToast
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
    </div>
  );
};

export default Archive;
