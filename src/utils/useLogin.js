import axios from "axios";

const useLogin = async (loginInput, user, setUser) => {
  try {
    const res = await axios.post("/api/auth/login", loginInput);
    // console.log(res);
    if (res.status === 200) {
      localStorage.setItem("token", res.data.encodedToken);
      setUser({
        ...user,
        name: res.data.foundUser.firstName + res.data.foundUser.lastName ,
        email: res.data.foundUser.email,
        password: "",
        isLoggedIn: true,
      });
      return true;
    }
  } catch (err) {
    console.log(err);
  }
  return false;
};

export default useLogin;
