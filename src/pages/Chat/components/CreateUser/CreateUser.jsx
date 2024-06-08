import React, { useState } from "react";
import styles from "./createUser.module.css";
import { convertToBase64 } from "../../../../until";
import { useDispatch } from "react-redux";
import { CreatUserMessanger } from "../../store/thunk";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUser((prevMovie) => ({
        ...prevMovie,
        image: file,
      }));
    }
  };
  const dispatch = useDispatch();
  async function createUser() {
    let base64String = "";
    if (user.image instanceof File) {
      base64String = await convertToBase64(user.image);
      dispatch(CreatUserMessanger({ name: user.name, image: base64String }))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          navigate("/");
        })
        .catch((e) => {
          toast.error(e);
        });
    }
  }
  return (
    <div className={styles.createUserWrapper}>
      <div className={styles.title}>
        <h4> Create User</h4>
      </div>
      <div className={styles.forms}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className={styles.input}
          value={user.name}
          onChange={handleChange}
        />
        <input type="file" defaultValue="" onChange={handleFileChange} />
      </div>
      <div className={styles.linkWrapper}>
        <button className={styles.create} onClick={createUser}>
          Create
        </button>
        <Link className={styles.back} to="/">
          {" "}
          Back
        </Link>
      </div>
    </div>
  );
};

export default CreateUser;
