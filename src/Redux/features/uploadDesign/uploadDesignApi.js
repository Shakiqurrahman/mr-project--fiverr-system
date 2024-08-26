import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configApi } from "../../../libs/configApi";

export const fetchGetUpload = createAsyncThunk("getData/upload", async () => {
  try {
    const api = `${configApi.api}upload/get`;
    const response = await axios.get(api);
    return response?.data?.data;
  } catch (error) {
    console.error(error);
  }
});
