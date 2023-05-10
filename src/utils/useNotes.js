import axios from "axios";
import { toast } from "react-toastify";

//get user notes from db
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

//add user notes to db
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
    if (res.status === 201) {
      setNotes([...res.data.notes]);
      toast.success("Note Added", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
    // console.log(res);
  } catch (err) {
    console.log(err);
  }
};

//edit user notes in db
export const updateUserNotes = async (id, note, setNotes) => {
  // console.log(id, note);
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
    if (res.status === 201) {
      setNotes([...res.data.notes]);
      toast.success("Note Updated", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//delete user notes from db
export const deleteUserNotes = async (id, setNotes) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios.delete(`/api/notes/${id}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    // console.log(res);
    if (res.status === 200) {
      setNotes([...res.data.notes]);

      toast.success("Note deleted", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//get users archived notes from db
export const getArchivedNotes = async (setArchivedNotes) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.get("/api/archives", {
      headers: {
        authorization: encodedToken,
      },
    });
    // console.log(res);
    if (res.status === 200) setArchivedNotes([...res.data.archives]);
  } catch (err) {
    console.log(err);
  }
};

//add note to user's archives
export const addArchiveNotes = async (id, note, setNotes, setArchivedNotes) => {
  const encodedToken = localStorage.getItem("token");
  // console.log(id, note);
  try {
    const res = await axios.post(
      `/api/notes/archives/${id}`,
      { note },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    // console.log(res);
    if (res.status === 201) {
      setNotes([...res?.data?.notes]);
      setArchivedNotes([...res?.data?.archives]);
      toast.success("Note Archived", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//restore note from user's archive - unarchive
export const restoreArchivedNotes = async (id, setNotes, setArchivedNotes) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `/api/archives/restore/${id}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    // console.log(res);
    if (res.status === 200) {
      setNotes([...res.data.notes]);
      setArchivedNotes([...res.data.archives]);

      toast.success("Note Unarchived", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//delete note from user's archive
export const deleteArchivedNote = async (id, setArchivedNotes) => {
  const encodedToken = localStorage.getItem("token");

  try {
    const res = await axios.delete(`/api/archives/delete/${id}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    // console.log(res);
    if (res.status === 200) {
      setArchivedNotes([...res.data.archives]);

      toast.success("Note Deleted", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//get user's trashed notes
export const getTrashedNotes = async (setTrashedNotes) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.get("/api/trash", {
      headers: {
        authorization: encodedToken,
      },
    });
    // console.log(res);
    if (res.status === 200) setTrashedNotes([...res.data.trash]);
  } catch (err) {
    console.log(err);
  }
};

//add note to user's trashed
export const addTrashNotes = async (id, setNotes, setTrashedNotes) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `/api/notes/trash/${id}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    // console.log(res);
    if (res.status === 201) {
      setNotes([...res.data.notes]);
      setTrashedNotes([...res.data.trash]);

      toast.success("Note Trashed", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//restore note from user's trash
export const restoreTrashedNotes = async (id, setNotes, setTrashedNotes) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `/api/trash/restore/${id}`,
      {},
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    // console.log(res);
    if (res.status === 200) {
      setNotes([...res.data.notes]);
      setTrashedNotes([...res.data.trash]);

      toast.success("Note restored", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//delete note from user's trashed
export const deleteTrashedNotes = async (id, setTrashedNotes) => {
  const encodedToken = localStorage.getItem("token");
  try {
    const res = await axios.delete(`/api/trash/delete/${id}`, {
      headers: {
        authorization: encodedToken,
      },
    });
    // console.log(res)
    if (res.status === 200) {
      setTrashedNotes([...res.data.trash]);

      toast.success("Note Deleted", {
        autoClose: 2000,
        position: "bottom-left",
        theme: "colored",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
