import { Link } from "react-router-dom";
import useLogin from "../utils/useLogin";
import { useState } from "react";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const login = useLogin;
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            value={loginInput.email}
            onChange={(e) =>
              setLoginInput({ ...loginInput, email: e.target.value })
            }
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={loginInput.password}
            onChange={(e) =>
              setLoginInput({ ...loginInput, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-teal-600 text-white font-bold hover:bg-green-dark focus:outline-none my-1"
            onClick={() => login(loginInput)}
          >
            Login
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="no-underline border-b border-blue text-blue hover:text-teal-600"
          >
            Signup
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
