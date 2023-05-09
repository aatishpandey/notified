import axios from "axios";
import { toast } from "react-toastify";

const useSignup = async (signupInput, user, setUser, handleToast) => {
  try {
    const res = await axios.post("/api/auth/signup", signupInput);
    console.log(res);
    if (res.status === 201) {
      localStorage.setItem("token", res.data.encodedToken);
      setUser({
        ...user,
        name: res.data.createdUser.firstname + res.data.createdUser.lastname,
        email: res.data.createdUser.email,
        password: res.data.createdUser.password,
        isLoggedIn: true,
      });
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
