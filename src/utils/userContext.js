import { createContext } from "react";

const userContext = createContext({
  user: {
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  },
});

export default userContext;
