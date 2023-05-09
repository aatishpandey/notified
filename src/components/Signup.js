import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../utils/useSignup";
import { useContext } from "react";
import userContext from "../utils/userContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const signup = useSignup;

  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleToast = (toastInput) => {
    toastInput();
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <ToastContainer pauseOnFocusLoss={false} />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            autoFocus
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="firstname"
            placeholder="First Name"
            minLength="3"
            value={signupInput.firstname}
            onChange={(e) =>
              setSignupInput({ ...signupInput, firstname: e.target.value })
            }
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="lastname"
            placeholder="Last Name"
            value={signupInput.lastname}
            onChange={(e) =>
              setSignupInput({ ...signupInput, lastname: e.target.value })
            }
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={signupInput.email}
            onChange={(e) =>
              setSignupInput({ ...signupInput, email: e.target.value })
            }
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={signupInput.password}
            onChange={(e) =>
              setSignupInput({ ...signupInput, password: e.target.value })
            }
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-teal-600 text-white font-bold hover:bg-green-dark focus:outline-none my-1"
            onClick={(e) => {
              const createUser = signup(
                signupInput,
                user,
                setUser,
                handleToast
              );
              if (createUser) navigate("/notes");
            }}
          >
            Create Account
          </button>

          {/* <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div> */}
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            to="/login"
            className="no-underline border-b border-blue text-blue hover:text-teal-600"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
