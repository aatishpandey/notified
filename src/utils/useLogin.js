import axios from "axios";
import { toast } from "react-toastify";

const useLogin = async (
  loginInput,
  user,
  setUser,

  setNotes,
  setArchivedNotes,
  setTrashedNotes
) => {
  try {
    const res = await axios.post("/api/auth/login", loginInput);
    // console.log(res);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.encodedToken);
      setUser({
        ...user,
        name: res?.data?.foundUser?.firstName + res?.data?.foundUser?.lastName,
        email: res?.data?.foundUser?.email,
        password: "",
        isLoggedIn: true,
      });

      setNotes([...res?.data?.foundUser?.notes]);
      setArchivedNotes([...res?.data?.foundUser?.archives]);
      setTrashedNotes([...res?.data?.foundUser?.trash]);

      toast.success("Logged In", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });

      return true;
    } else {
      toast.error("Login Failed! Please enter correct credentials", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
      return false;
    }
  } catch (err) {
    console.log(err);
    toast.error("Login Failed!", {
      autoClose: 2000,
      position: "bottom-left",
      theme: "colored",
    });
    return false;
  }
};

export default useLogin;
