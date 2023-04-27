import { Link } from "react-router-dom";
import noteAvatar from "../images/undraw_design_notes_re_eklr.svg";
import { useContext, useEffect } from "react";
import userContext from "../utils/userContext";

const Body = () => {
  const { user, setUser } = useContext(userContext);
  // console.log(user);

  return (
    <div className="flex flex-col items-center m-6">
      {/* <div className="text-6xl font-sans font-extrabold ">📔Notify</div> */}
      <div className="w-[100%] mt-8 flex flex-wrap justify-around">
        <div>
          <div className="text-3xl font-bold">Meet your modern </div>
          <div className="text-3xl font-bold text-teal-600">
            Note Taking App
          </div>
          <div className="w-[300px] mt-6 mb-14">
            Manage your daily tasks and workflow in a modern way and boost your
            efficiency without any efforts.
          </div>
          {user.isLoggedIn ? (
            <div className="bg-teal-600 text-white font-bold py-2 pl-4 rounded-md">
              Already Logged In See your &nbsp;
              <Link to="/notes" className="hover:underline">Notes?</Link>
            </div>
          ) : (
            <div>
              <Link
                to={"/signup"}
                className="bg-teal-600 font-bold text-white py-2 px-4 rounded-md   mb-4 mr-6 shadow-md"
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
        <img src={noteAvatar} alt="notes-avatar" className=" w-[500px]" />
      </div>
    </div>
  );
};

export default Body;
