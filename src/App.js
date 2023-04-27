import { useState } from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Error from "./components/Error.js";
import Body from "./components/Body.js";
import Notes from "./components/Notes.js";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Mockman from "mockman-js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import UserContext from "./utils/userContext.js";

const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  });
  return (
    <div className="App h-[100%] flex flex-col">
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "notes",
        element: <Notes />,
      },
      {
        path: "mock",
        element: <Mockman />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default appRouter;
