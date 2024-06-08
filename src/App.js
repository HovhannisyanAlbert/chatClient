import React from "react";
import Chat from "./pages/Chat/container";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import CreateUser from "./pages/Chat/components/CreateUser/CreateUser";
import CreateRoom from "./pages/Chat/components/CreateRoom/CreateRoom";
import Room from "./pages/Chat/components/Room/Room";
import Messanger from "./pages/Chat/components/Messanger/Messanger";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/:id/:room_name" element={<Room />} />
        <Route path="/messanger/:id" element={<Messanger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
