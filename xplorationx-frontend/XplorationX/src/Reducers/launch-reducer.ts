import Launch from "../Models/Launch.ts";
import api from "./axiosInstance.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState: { singleLaunch:Launch | null; allLaunches:Launch[] } ={
    singleLaunch:null,
    allLaunches:[],
}

export const getlaunches = createAsyncThunk(
    "launches/getlaunches",
    async () => {
        try {
            const response = await api.get("/launches");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getLaunchById = createAsyncThunk(
    "launches/getLaunchById",
    async (id:string) => {
        try {
            const response = await api.get(`/launches/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const launchesSlice = createSlice({
    name: "launches",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getlaunches.fulfilled, (state, action) => {
                return { ...state, allLaunches: action.payload };
            })
            .addCase(getlaunches.pending, (state, action) => {
                console.log("Get launches pending", action.payload);
            })
            .addCase(getlaunches.rejected, (state, action) => {
                console.error("Get launches failed:", action.payload);
            });

        builder
            .addCase(getLaunchById.fulfilled, (state, action) => {
                return {
                    ...state,
                    singleLaunch: action.payload,
                };
            })
            .addCase(getLaunchById.pending, (state, action) => {
                console.log("Get launch by ID pending", action.payload);
            })
            .addCase(getLaunchById.rejected, (state, action) => {
                console.error("Get launch by ID failed:", action.payload);
            });
    }
});

export default launchesSlice.reducer;