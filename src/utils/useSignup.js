import axios from "axios";

const useSignup = async (signupInput) => {
  try {
    const res = await axios.post("/api/auth/signup", signupInput);
    console.log(res);
    localStorage.setItem("token", res.data.encodedToken);
  } catch (err) {
    console.log(err);
  }
};

export default useSignup;
