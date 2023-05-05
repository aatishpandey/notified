import axios from "axios";

export const getUserNotes = async (setNotes) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.get("api/notes", {
      headers: {
        authorization: encodedToken,
      },
    });
    // console.log(res);
    if (res.status === 200) {
      setNotes([...res.data.notes]);
    }
  } catch (err) {
    console.log(err);
  }
};

export const addUserNotes = async (setNotes, note) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "/api/notes",
      { note },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    if (res.status === 201) setNotes([...res.data.notes]);
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserNotes = async (id, note) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `/api/notes/${id}`,
      { note },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};
