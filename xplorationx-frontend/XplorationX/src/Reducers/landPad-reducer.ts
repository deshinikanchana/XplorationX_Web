import LandPad from "../Models/LandPad.ts";
import api from "./axiosInstance.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState: { singleLandPad:LandPad | null; allLandPads:LandPad[] } ={
    singleLandPad:null,
    allLandPads:[],
}


export const getlandpads = createAsyncThunk(
    "landpads/getlandpads",
    async () => {
        try {
            const response = await api.get("/landpads");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getLandPadById = createAsyncThunk(
    "landpads/getLandPadById",
    async (id:string) => {
        try {
            const response = await api.get(`/landpads/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const landPadsSlice = createSlice({
    name: "landpads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getlandpads.fulfilled, (state, action) => {
                return { ...state, allLandPads: action.payload };
            })
            .addCase(getlandpads.pending, (state, action) => {
                console.log("Get landpads pending", action.payload);
            })
            .addCase(getlandpads.rejected, (state, action) => {
                console.error("Get landpads failed:", action.payload);
            });

        builder
            .addCase(getLandPadById.fulfilled, (state, action) => {
                return {
                    ...state,
                    singleLandPad: action.payload,
                };
            })
            .addCase(getLandPadById.pending, (state, action) => {
                console.log("Get landpad by ID pending", action.payload);
            })
            .addCase(getLandPadById.rejected, (state, action) => {
                console.error("Get landpad by ID failed:", action.payload);
            });
    }
});

export default landPadsSlice.reducer;