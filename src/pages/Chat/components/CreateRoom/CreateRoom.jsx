import React, { useState } from "react";
import styles from "./createRoom.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CreateRoomUser } from "../../store/thunk";
import toast from "react-hot-toast";
const CreateRoom = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    dispatch(CreateRoomUser({ name }))
      .unwrap()
      .then((res) => {
        toast.success(res.success);
        navigate("/");
      })
      .catch((e) => {
        toast.error(e.error);
      });
  };
  return (
    <div className={styles.createRoomWrapper}>
      <div className={styles.room}>
        <h4> Create Room</h4>
      </div>
      <div className={styles.form}>
        <input
          type="text"
          value={name}
          placeholder="Enter Room"
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button className={styles.createButton} onClick={handleClick}>
          {" "}
          Create Room
        </button>
      </div>
      <Link className={styles.back} to="/">
        {" "}
        Back
      </Link>
    </div>
  );
};

export default CreateRoom;
