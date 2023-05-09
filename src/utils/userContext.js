import { createContext } from "react";

const userContext = createContext({
  user: {
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  },
  notes: [],
  archivedNotes: [],
  trashNotes: [],
  noteId: {
    editNoteId: "",
  },
  note: {
    id: "",
    content: "",
  },
  showSideBar: false,
});

export default userContext;
