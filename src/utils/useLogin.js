import axios from "axios";

const useLogin = async (loginInput) => {
  try {
    const res = await axios.post("/api/auth/login", loginInput);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default useLogin;
