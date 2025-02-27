import Favourite from "../Models/Favourite.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "./axiosInstance.ts";

export const initialState: Favourite[] = [];

type NewFav = Omit<Favourite, 'FavId'>;

export const saveFavourite = createAsyncThunk(
    "favourites/saveFavourite",
    async (favourites: NewFav) => {
        try {
            const response = await api.post("/favourites", favourites);
            return response.data;
        } catch (error) {
            return console.log("error", error);
        }
    }
);

export const getFavourites = createAsyncThunk(
    "favourites/getFavourites",
    async () => {
        try {
            const response = await api.get("/favourites");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const deletefavourite = createAsyncThunk(
    "favourites/deleteFavourite",
    async (id: number) => {
        try {
            const response = await api.delete(`/favourites/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveFavourite.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveFavourite.rejected, (state, action) => {
                console.error("Failed to save Favourite:", action.payload);
            })
            .addCase(saveFavourite.pending, (state, action) => {
                console.log("Save Favourite Pending", action.payload);
            });

        builder
            .addCase(getFavourites.fulfilled, (state, action) => {

                const currentUserId = Number(localStorage.getItem('currentUserId'));

                const filteredFavourites = action.payload.filter(
                    (favourite: Favourite) => favourite.UserId === currentUserId
                );

                return filteredFavourites;
            })

            .addCase(getFavourites.pending, (state, action) => {
                console.log("Get Favourites pending", action.payload);
            })
            .addCase(getFavourites.rejected, (state, action) => {
                console.error("Get Favourites failed:", action.payload);
            });

        builder
            .addCase(deletefavourite.rejected, (state, action) => {
                console.error("Failed to delete Favourite", action.payload);
            })
            .addCase(deletefavourite.fulfilled, (state, action) => {
                console.log(action);
                return (state = state.filter(
                    (favourites: Favourite) => favourites.FavId !== action.payload.FavId
                ));
            })
            .addCase(deletefavourite.pending, (state, action) => {
                console.log("Pending delete Favourite", action.payload);
            });
    },
});

export default favouriteSlice.reducer;