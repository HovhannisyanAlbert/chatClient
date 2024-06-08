import React, { useState } from "react";
import styles from "./room.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CheckUser } from "../../store/thunk";
import toast from "react-hot-toast";

const Room = () => {
  const { id, room_name } = useParams();
  const [name, setName] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  const dispatch = useDispatch();

  const handleCheck = async () => {
    dispatch(CheckUser({ name }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);

        setIsCheck(true);
        localStorage.setItem("room_name", room_name);
        localStorage.setItem("user_id", res.data);
      })
      .catch((e) => {
        toast.error(e);
        setIsCheck(false);
      });
  };

  return (
    <div className={styles.room}>
      <div className={styles.description}>
        <h4>
          {" "}
          First Step if you have an account u write in input and check here
        </h4>
      </div>
      <div className={styles.checkUserWrapper}>
        <input
          type="text"
          value={name}
          placeholder="Enter you user name"
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.checkUser} onClick={handleCheck}>
          {" "}
          Check User{" "}
        </button>
      </div>
      {isCheck && (
        <Link to={`/messanger/${id}/`} className={styles.link}>
          Join
        </Link>
      )}
    </div>
  );
};

export default Room;
