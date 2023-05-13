import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../utils/useSignup";
import { useContext } from "react";
import userContext from "../utils/userContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isFirstName, setIsFirstName] = useState(false);
  const [isLastName, setIsLastName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const [isFormOk, setIsFormOk] = useState(false);
  const signup = useSignup;
  const { user, setUser, setNotes, setArchivedNotes, setTrashedNotes } =
    useContext(userContext);
  const navigate = useNavigate();

  const validateForm = () => {
    if (
      isFirstName &&
      isLastName &&
      isEmail &&
      isPassword &&
      isConfirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <form className="bg-grey-lighter flex flex-col">
      <ToastContainer pauseOnFocusLoss={false} />
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-8 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            autoFocus
            className="block border border-grey-light w-full p-3 rounded mb-2"
            name="firstname"
            placeholder="First Name"
            value={signupInput.firstName}
            onChange={(e) => {
              const value = e.target.value;
              setSignupInput({ ...signupInput, firstName: e.target.value });
              value.length >= 3 ? setIsFirstName(true) : setIsFirstName(false);
            }}
          />
          {isFirstName ? null : (
            <div className="text-red-600">
              Please enter First Name(min. 3 characters)
            </div>
          )}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded my-2"
            name="lastname"
            placeholder="Last Name"
            value={signupInput.lastName}
            onChange={(e) => {
              const value = e.target.value;
              setSignupInput({ ...signupInput, lastName: e.target.value });
              value.length >= 3 ? setIsLastName(true) : setIsLastName(false);
            }}
          />
          {isLastName ? null : (
            <div className="text-red-600">
              Please enter Last Name(min. 3 characters)
            </div>
          )}

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded my-2"
            name="email"
            placeholder="Email"
            value={signupInput.email}
            onChange={(e) => {
              const value = e.target.value;
              setSignupInput({ ...signupInput, email: e.target.value });

              if (value.includes("@") && value.includes(".com")) {
                setIsEmail(true);
              } else {
                setIsEmail(false);
              }
            }}
          />
          {isEmail ? null : (
            <div className="text-red-600">
              Please check your email(email should contain "@" & ".com")
            </div>
          )}

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded my-2"
            name="password"
            placeholder="Password"
            value={signupInput.password}
            onChange={(e) => {
              const value = e.target.value;
              setSignupInput({ ...signupInput, password: e.target.value });

              if (value.length >= 6) {
                setIsPassword(true);
              } else {
                setIsPassword(false);
              }
            }}
          />
          {isPassword ? null : (
            <div className="text-red-600">
              Please enter Password(min. 6 characters)
            </div>
          )}
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded my-2"
            name="confirm_password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(e.target.value);

              if (value === signupInput.password) {
                setIsConfirmPassword(true);
              } else {
                setIsConfirmPassword(false);
              }
            }}
          />
          {isConfirmPassword ? null : (
            <div className="text-red-600">Passwords don't match</div>
          )}

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-teal-600 text-white font-bold hover:bg-green-dark focus:outline-none my-1"
            // disabled={isFormOk ? false : true}
            onClick={async (e) => {
              e.preventDefault();
              const submitForm = validateForm();
              if (submitForm) {
                setIsFormOk(true);
                const createUser = await signup(
                  signupInput,
                  user,
                  setUser,
                  setNotes,
                  setArchivedNotes,
                  setTrashedNotes
                );
                if (createUser) navigate("/notes");
              }
            }}
          >
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
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
    </form>
  );
};

export default Signup;
