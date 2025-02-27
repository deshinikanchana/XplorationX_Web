import Crew from "../Models/Crew.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "./axiosInstance.ts";

export const initialState: { crewMember: Crew | null; allCrew: Crew[] } = {
    crewMember: null,
    allCrew: [],
};

export const getcrew = createAsyncThunk(
    "crew/getcrew",
    async () => {
        try {
            const response = await api.get("/crew");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getCrewById = createAsyncThunk(
    "crew/getCrewById",
    async (id:string) => {
        try {
            const response = await api.get(`/crew/${id}`);
            console.log("Response for crew member :" ,response.data);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);



const crewSlice = createSlice({
    name: "crew",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getcrew.fulfilled, (state, action) => {
                return { ...state, allCrew: action.payload };
            })
            .addCase(getcrew.pending, (state, action) => {
                console.log("Get crew pending", action.payload);
            })
            .addCase(getcrew.rejected, (state, action) => {
                console.error("Get crew failed:", action.payload);
            });

        builder
            .addCase(getCrewById.fulfilled, (state, action) => {
                return {
                    ...state,
                    crewMember: action.payload,
                };
            })
            .addCase(getCrewById.pending, (state, action) => {
                console.log("Get crew by ID pending", action.payload);
            })
            .addCase(getCrewById.rejected, (state, action) => {
                console.error("Get crew by ID failed:", action.payload);
            });

    }
});

export default crewSlice.reducer;