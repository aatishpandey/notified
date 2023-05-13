import { Link } from "react-router-dom";
import noteAvatar from "../images/undraw_design_notes_re_eklr.svg";
import { useContext } from "react";
import userContext from "../utils/userContext";
import Sidebar from "./Sidebar";

const Body = () => {
  const { user, setUser, showSideBar, setShowSideBar } =
    useContext(userContext);
  // console.log(user);

  return (
    <div className="flex flex-col items-center px-6 h-full">
      <Sidebar
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        user={user}
      />

      <div className="w-[100%] mt-8 flex flex-wrap justify-start md:justify-around">
        <div>
          <div className="text-3xl font-bold">Meet your modern </div>
          <div className="text-3xl font-bold text-teal-600">
            Note Taking App
          </div>
          <div className="w-[full] mt-6 mb-14 sm:max-w-[300px]">
            Manage your daily tasks and workflow in a modern way and boost your
            efficiency without any efforts.
          </div>
          {user.isLoggedIn ? (
            <div className="bg-teal-600 text-white font-bold py-2 px-4 rounded-md max-w-fit sm:max-w-[400px]">
              <span className="hidden sm:inline">Already Logged In?</span> See
              your {" "}
              <Link to="/notes" className="hover:underline">
                Notes
              </Link>
            </div>
          ) : (
            <div className="flex flex-wrap items-center">
              <Link
                to={"/signup"}
                className="bg-teal-600 font-bold text-white py-2 px-4 rounded-md  mr-6 shadow-md"
              >
                Join Now
              </Link>
              <span>Already have an account?</span>{" "}
              <Link to={"/login"} className="text-teal-600 font-bold">
                Sign in
              </Link>
            </div>
          )}
        </div>
        <div className="max-w-[200px] sm:max-w-[300px] md:max-w-[400px] mt-8 sm:mt-0">
          <img src={noteAvatar} alt="notes-avatar" className=" w-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default Body;
