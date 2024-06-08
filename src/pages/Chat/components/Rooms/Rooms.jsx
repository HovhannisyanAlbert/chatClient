import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRooms } from "../../store/thunk";
import { getRooms } from "../../store/chatSlice";
import toast from "react-hot-toast";
import styles from "./rooms.module.css";
import { Link } from "react-router-dom";

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms = [] } = useSelector((state) => state.chat);
  const [serverRunning, setServerRunning] = useState(true);

  useEffect(() => {
    const checkServerStatusAndFetchRooms = async () => {
      try {
        await dispatch(GetRooms()).unwrap();
        setServerRunning(true);
      } catch (e) {
        setServerRunning(false);
        toast.error("Server is not running. Please try again later.");
      }
    };

    checkServerStatusAndFetchRooms();
  }, [dispatch]);

  if (!serverRunning) {
    return <div>Server is not running. Please try again later.</div>;
  }

  return (
    <div className={styles.roomWrapper}>
      {Array.isArray(rooms) && rooms.length > 0 ? (
        rooms.map((elem) => (
          <div key={elem.id}>
            <Link className={styles.link} to={`/${elem.id}/${elem.name}`}>
              {elem.name}
            </Link>
          </div>
        ))
      ) : (
        <div>No rooms available.</div>
      )}
    </div>
  );
};

export default Rooms;
