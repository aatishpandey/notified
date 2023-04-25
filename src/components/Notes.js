import axios from "axios";
import { useEffect } from "react";

const Notes = () => {
  const getUserNotes = async () => {
    const encodedToken = localStorage.getItem("token");
    try {
      const res = await axios.get("api/user", {
        headers: {
          authorization: encodedToken,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserNotes();
  }, []);

  return (
    <>
      <h1>Notes</h1>
    </>
  );
};

export default Notes;
