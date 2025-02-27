import Payload from "../Models/Payload.ts";
import api from "./axiosInstance.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState: { singlePayload:Payload | null; allPayloads:Payload[]}={
    singlePayload:null,
    allPayloads:[],
}

export const getpayloads = createAsyncThunk(
    "payloads/getpayloads",
    async () => {
        try {
            const response = await api.get("/payloads");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getPayloadById = createAsyncThunk(
    "payloads/getPayLoadById",
    async (id:string) => {
        try {
            const response = await api.get(`/payloads/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const payLoadsSlice = createSlice({
    name: "payloads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getpayloads.fulfilled, (state, action) => {
                return { ...state, allPayloads: action.payload };
            })
            .addCase(getpayloads.pending, (state, action) => {
                console.log("Get payloads pending", action.payload);
            })
            .addCase(getpayloads.rejected, (state, action) => {
                console.error("Get payloads failed:", action.payload);
            });

        builder
            .addCase(getPayloadById.fulfilled, (state, action) => {
                return {
                    ...state,
                    singlePayload: action.payload,
                };
            })
            .addCase(getPayloadById.pending, (state, action) => {
                console.log("Get payload by ID pending", action.payload);
            })
            .addCase(getPayloadById.rejected, (state, action) => {
                console.error("Get payload by ID failed:", action.payload);
            });
    }
});

export default payLoadsSlice.reducer;