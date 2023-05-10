import axios from "axios";
import { toast } from "react-toastify";

const useSignup = async (
  signupInput,
  user,
  setUser,
  handleToast,
  setNotes,
  setArchivedNotes,
  setTrashedNotes
) => {
  try {
    const res = await axios.post("/api/auth/signup", signupInput);
    console.log(res);
    if (res.status === 201) {
      localStorage.setItem("token", res.data.encodedToken);
      setUser({
        ...user,
        name: res.data.createdUser.firstName + res.data.createdUser.lastName,
        email: res.data.createdUser.email,
        password: res.data.createdUser.password,
        isLoggedIn: true,
      });

      setNotes([...res.data.foundUser.notes]);
      setArchivedNotes([...res.data.foundUser.archives]);
      setTrashedNotes([...res.data.foundUser.trash]);
      handleToast(
        toast.success("Signed Up", {
          autoClose: 5000,
          position: "bottom-left",
          theme: "colored",
        })
      );
      return true;
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export default useSignup;
