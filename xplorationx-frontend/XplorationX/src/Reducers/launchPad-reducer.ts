import LaunchPad from "../Models/LaunchPad.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "./axiosInstance.ts";

export const initialState: {singleLaunchPad:LaunchPad | null; allLaunchPads:LaunchPad[]} = {
    singleLaunchPad: null,
    allLaunchPads: [],
}

export const getlaunchpads = createAsyncThunk(
    "launchpads/getlaunchpads",
    async () => {
        try {
            const response = await api.get("/launchpads");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getLaunchPadById = createAsyncThunk(
    "launchpads/getLaunchPadById",
    async (id:string) => {
        try {
            console.log("launchPad-reducer line 33" , id);
            const response = await api.get(`/launchpads/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const launchPadsSlice = createSlice({
    name: "launchpads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getlaunchpads.fulfilled, (state, action) => {
                return { ...state, allLaunchPads: action.payload };
            })
            .addCase(getlaunchpads.pending, (state, action) => {
                console.log("Get launchpads pending", action.payload);
            })
            .addCase(getlaunchpads.rejected, (state, action) => {
                console.error("Get launchpads failed:", action.payload);
            });

        builder
            .addCase(getLaunchPadById.fulfilled, (state, action) => {
                return {
                    ...state,
                    singleLaunchPad: action.payload,
                };
            })
            .addCase(getLaunchPadById.pending, (state, action) => {
                console.log("Get launchpad by ID pending", action.payload);
            })
            .addCase(getLaunchPadById.rejected, (state, action) => {
                console.error("Get launchpad by ID failed:", action.payload);
            });
    }
});

export default launchPadsSlice.reducer;