import { Link } from "react-router-dom";
import { useContext } from "react";
import userContext from "../utils/userContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(userContext);
  // console.log(user);
  const navigate = useNavigate();
  return (
    <div className=" header w-[100%] shadow-lg py-4 px-4 flex justify-between items-center">
      <Link to="/">
        <div className="text-3xl font-sans hover:text-teal-600 ">📔Notify</div>
      </Link>
      <div className="flex list-none text-lg font-medium">
        <li className="p-2 hover:text-teal-600">
          <Link to="/notes">Notes</Link>
        </li>
        <li className="p-2 hover:text-teal-600">Trash</li>
        <li className="p-2 hover:text-teal-600">Archive</li>
      </div>

      {user.isLoggedIn ? (
        <div className="text-lg font-medium">🟢{user.name}</div>
      ) : null}

      <div className="text-lg font-medium">
        {user.isLoggedIn ? (
          <button
            onClick={() => {
              setUser({
                ...user,
                name: "",
                email: "",
                password: "",
                isLoggedIn: false,
              });
              localStorage.removeItem("token");
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
