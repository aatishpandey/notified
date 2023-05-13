import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../utils/userContext";
import { useNavigate } from "react-router-dom";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const {
    user,
    setUser,
    setShowSideBar,
    setNotes,
    setArchivedNotes,
    setTrashedNotes,
  } = useContext(userContext);
  // console.log(user);
  const navigate = useNavigate();

  return (
    <div className=" header w-[100%] shadow-lg py-4 px-4 flex flex-wrap justify-between items-center border-b-2 border-gray-400">
      <FontAwesomeIcon
        icon={icon({
          name: "bars",
        })}
        size="lg"
        className="md:hidden"
        onClick={() => setShowSideBar((prevState) => !prevState)}
      />

      <div
        className="text-xl font-sans hover:text-teal-600 md:text-3xl cursor-pointer"
        onClick={() => {
          navigate("/");
          setShowSideBar(false);
        }}
      >
        📔Notified
      </div>

      <div className="hidden list-none text-sm font-medium sm:flex md:text-lg">
        <li className="p-2 hover:text-teal-600">
          <Link to={!user.isLoggedIn ? "/" : "/notes"}>Notes</Link>
        </li>
        <li className="p-2 hover:text-teal-600">
          <Link to={!user.isLoggedIn ? "/" : "/archive"}>Archive</Link>
        </li>
        <li className="p-2 hover:text-teal-600">
          <Link to={!user.isLoggedIn ? "/" : "/trash"}>Trash</Link>
        </li>
      </div>

      {user.isLoggedIn ? (
        <div className="text-sm font-medium hidden xs:inline md:text-lg">
          🟢{user.name}
        </div>
      ) : null}

      <div className="text-sm font-medium md:text-lg">
        {user.isLoggedIn ? (
          <button
            onClick={() => {
              navigate("/login");
              setUser({
                user: {
                  name: "",
                  email: "",
                  password: "",
                  isLoggedIn: false,
                },
              });
              setNotes([]);
              setArchivedNotes([]);
              setTrashedNotes([]);
              // localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Header;
