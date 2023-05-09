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
import Archive from "./components/Archive.js";
import UserContext from "./utils/userContext.js";
import Trash from "./components/Trash.js";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  });
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [noteId, setNoteId] = useState({
    editNoteId: "",
  });
  const [note, setNote] = useState({
    id: "",
    content: "",
  });

  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className="App h-[100%] flex flex-col min-w-[30%]">
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
          notes: notes,
          setNotes: setNotes,
          noteId: noteId,
          setNoteId: setNoteId,
          note: note,
          setNote: setNote,
          archivedNotes: archivedNotes,
          setArchivedNotes: setArchivedNotes,
          trashedNotes: trashedNotes,
          setTrashedNotes: setTrashedNotes,
          showSideBar: showSideBar,
          setShowSideBar: setShowSideBar,
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
      {
        path: "archive",
        element: <Archive />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
    ],
  },
]);

export default appRouter;
