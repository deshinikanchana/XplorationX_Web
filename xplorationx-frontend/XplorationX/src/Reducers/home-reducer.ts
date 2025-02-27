import axios from "./axiosInstance.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Home from "../Models/Home.ts";

export const initialState: Home[] = [];


export const getcompany = createAsyncThunk(
    "company/getcompany",
    async () => {
        try {
            const response = await axios.get("/company");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const homeSlice = createSlice({
    name: "company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getcompany.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getcompany.pending, (state, action) => {
                console.log("Get company pending", action.payload);
            })
            .addCase(getcompany.rejected, (state, action) => {
                console.error("Get company failed:", action.payload);
            });
    }
});

export default homeSlice.reducer;