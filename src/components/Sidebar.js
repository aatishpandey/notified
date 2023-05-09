import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showSideBar, setShowSideBar, user }) => {
  const navigate = useNavigate();
  return (
    <>
      {showSideBar ? (
        <div className="sidebar-container md:hidden absolute left-0 right-0 z-[9999] bg-[rgba(0,0,0,0.4)] h-[100%]">
          <div className="sidebar w-full xs:w-[65%] h-full bg-white">
            <div className=" list-none text-base text-gray-700 font-medium flex flex-col">
              {user.isLoggedIn ? (
                <div className="text-lg px-2 py-4 my-2 flex items-center xs:hidden">
                  <FontAwesomeIcon
                    icon={icon({
                      name: "user",
                    })}
                    size="lg"
                    className="mx-4 "
                  />
                  🟢{user.name}
                </div>
              ) : null}

              <li className="px-2 py-4 my-2 hover:text-teal-600 flex items-center">
                <FontAwesomeIcon
                  icon={icon({
                    name: "sticky-note",
                  })}
                  size="lg"
                  className="mx-4"
                />
                <button
                  onClick={() => {
                    // !user.isLoggedIn ? navigate("/") : navigate("notes");
                    if (!user.isLoggedIn) {
                      navigate("/");
                      setShowSideBar(false);
                    } else {
                      navigate("/notes");
                      setShowSideBar(false);
                    }
                  }}
                >
                  Note
                </button>
              </li>
              <li className="px-2 py-4 my-2 hover:text-teal-600 flex items-center">
                <FontAwesomeIcon
                  icon={icon({
                    name: "archive",
                  })}
                  size="lg"
                  className="mx-4"
                />
                <button
                  onClick={() => {
                    // !user.isLoggedIn ? navigate("/") : navigate("notes");
                    if (!user.isLoggedIn) {
                      navigate("/");
                      setShowSideBar(false);
                    } else {
                      navigate("/archive");
                      setShowSideBar(false);
                    }
                  }}
                >
                  Archive
                </button>
              </li>
              <li className="px-2 py-4 my-2 hover:text-teal-600 flex items-center">
                <FontAwesomeIcon
                  icon={icon({
                    name: "trash-alt",
                  })}
                  size="lg"
                  className="mx-4"
                />
                <button
                  onClick={() => {
                    // !user.isLoggedIn ? navigate("/") : navigate("notes");
                    if (!user.isLoggedIn) {
                      navigate("/");
                      setShowSideBar(false);
                    } else {
                      navigate("/trash");
                      setShowSideBar(false);
                    }
                  }}
                >
                  Trash
                </button>
              </li>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
