import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { configApi } from "../../../libs/configApi";

export const fetchCategory = createAsyncThunk("getData/category", async () => {
  try {
    const api = `${configApi.api}category/get`;
    const response = await axios.get(api);
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteCategory = createAsyncThunk(
  "delete/cataegory",
  async (id) => {
    try {
      const api = `${configApi.api}category/delete/${id}`;
      const response = await axios.delete(api);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
);
