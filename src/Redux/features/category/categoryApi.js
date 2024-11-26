import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { configApi } from "../../../libs/configApi";

export const fetchCategory = createAsyncThunk("getData/category", async () => {
  try {
    const api = `${configApi.api}category/get`;
    const response = await axios.get(api);
    return response?.data?.data;
  } catch (error) {
    toast.error("Something went wrong!");
  }
});

export const deleteCategory = createAsyncThunk(
  "delete/category",
  async (id) => {
    try {
      const api = `${configApi.api}category/delete/${id}`;
      const response = await axios.delete(api);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  },
);
