import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EnterRoom, JoinUserChat } from "../../store/thunk";
import toast from "react-hot-toast";
import styles from "./messanger.module.css";
import { messanger } from "../../store/chatSlice";
import { formatTimestamp } from "../../../../until";

const Messanger = () => {
  const { messages = [] } = useSelector((state) => state.chat);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [websocket, setWebsocket] = useState(null);

  const room_id = Number(id);
  const roomName = localStorage.getItem("room_name");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    dispatch(JoinUserChat({ room_id, user_id }));
    dispatch(EnterRoom({ room_id }))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        dispatch(messanger(res.messages));
      })
      .catch((e) => {
        toast.error(e.error);
      });
  }, [dispatch, room_id, user_id]);

  useEffect(() => {
    if (roomName) {
      const ws = new WebSocket(`ws://localhost:8000/ws/messages/${roomName}/`);

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message:", data);
        if (data.messages) {
          dispatch(messanger(data.messages));
        } else {
          dispatch(messanger([data]));
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setWebsocket(ws);

      return () => {
        if (ws) {
          ws.close();
        }
      };
    }
  }, [dispatch, roomName]);

  const sendMessage = () => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      const messageObject = {
        type: "create_message",
        message: message,
        room_name: roomName,
        room_id,
        user_id,
        timestamp: new Date().toISOString(),
      };

      const messageString = JSON.stringify(messageObject);
      setMessage("");
      websocket.send(messageString);
    } else {
      console.error("WebSocket connection not established");
    }
  };

  const handleExit = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.messager}>
      <div className={styles.roomName}>
        <h4 className={styles.welcome}> Welcome to {roomName} room </h4>
      </div>
      {messages.length > 0 &&
        messages.map((elem) => (
          <div key={elem.id}>
            <div className={styles.userInfo}>
              <img
                src={`http://127.0.0.1:8000${elem.user_image}`}
                alt="image"
                className={styles.img}
              />
              <span className={styles.userName}> {elem.user_name}</span>
              <span className={styles.time}>
                {formatTimestamp(elem.timestamp)}
              </span>
            </div>
            <div className={styles.messageContainer}>
              <span className={styles.messageText}> {elem.message} </span>
            </div>
          </div>
        ))}
      <div className={styles.form}>
        <input
          type="text"
          value={message}
          placeholder="Enter message"
          onChange={(e) => setMessage(e.target.value)}
          className={styles.input}
        />
        <button className={styles.bttn} onClick={sendMessage}>
          Add Message
        </button>
      </div>
      <div className={styles.wrapperExit}>
        <button className={styles.exit} onClick={handleExit}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default Messanger;
