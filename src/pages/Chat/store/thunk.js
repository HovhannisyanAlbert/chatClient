import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../../service/request";

export const CreatUserMessanger = createAsyncThunk(
  "create/user",
  async ({ name, image }, { rejectWithValue }) => {
    try {
      const response = await request({
        method: "POST",
        data: {
          name,
          image,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const CreateRoomUser = createAsyncThunk(
  "create/room",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await request({
        url: "room/",
        method: "POST",
        data: {
          name,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const CheckUser = createAsyncThunk(
  "check/user",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await request({
        url: "check-user/",
        method: "POST",
        data: {
          name,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const GetRooms = createAsyncThunk(
  "get/rooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await request({
        url: "room/",
        method: "GET",
      });
      return response.data.rooms;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const JoinUserChat = createAsyncThunk(
  "join/chat",
  async ({ room_id, user_id }, { rejectWithValue }) => {
    try {
      const response = await request({
        url: `${room_id}/join/`,
        method: "POST",
        data: {
          user_id,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const EnterRoom = createAsyncThunk(
  "enter/room",
  async ({ room_id }, { rejectWithValue }) => {
    try {
      const response = await request({
        url: `${room_id}/messages/`,
        method: "GET",
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
