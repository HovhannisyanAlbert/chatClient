import React from "react";

import styles from "./chat.module.css";
import { Link } from "react-router-dom";
import Rooms from "../components/Rooms/Rooms";

const Chat = () => {
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.info}>
        <div className={styles.notAccount}>
          <span> If you have not account</span>
          <Link to="/create-user" className={styles.linkUser}>
            {" "}
            Create User{" "}
          </Link>
        </div>

        <div className={styles.linkWrapper}>
          <span> You can create here Room for converstation</span>
          <Link className={styles.createRoom} to="/create-room">
            {" "}
            Create Room
          </Link>
        </div>
      </div>
      <div className={styles.rooms}>
        <Rooms />
      </div>{" "}
    </div>
  );
};

export default Chat;
