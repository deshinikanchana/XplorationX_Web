import User from "../Models/User.ts";
import api from "./axiosInstance.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState: User[] = [];

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async () => {
        try {
            const response = await api.get("/user");
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const getUserByEmail = createAsyncThunk(
    "user/getUserByEmail",
    async (email:string) => {
        try{
            const response = await api.get(`/user/${email}`);
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id: number) => {
        try {
            const response = await api.delete(`/user/${id}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (users: User) => {
        try {
            const response = await api.put(`/user/${users.UserId}`, users);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                return { ...state, User: action.payload };
            })
            .addCase(getUsers.pending, (state, action) => {
                console.log("Get users pending", action.payload);
            })
            .addCase(getUsers.rejected, (state, action) => {
                console.error("Get users failed:", action.payload);
            });

        builder
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                return { ...state, User: action.payload };
            })
            .addCase(getUserByEmail.pending, (state, action) => {
                console.log("Get user pending", action.payload);
            })
            .addCase(getUserByEmail.rejected, (state, action) => {
                console.error("Get user failed:", action.payload);
            });

        builder
            .addCase(deleteUser.rejected, (state, action) => {
                console.error("Failed to delete User", action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(action);
                return (state = state.filter(
                    (users: User) => users.UserId !== action.payload.UserId
                ));
            })
            .addCase(deleteUser.pending, (state, action) => {
                console.log("Pending delete User", action.payload);
            });

        builder
            .addCase(updateUser.rejected, (state, action) => {
                console.error("Failed to Update User:", action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const users = state.find(
                    (users: User) => users.UserId === action.payload.UserId
                );
                if (users) {
                    users.Name = action.payload.Name;
                    users.Password = action.payload.Password
                }
            })
            .addCase(updateUser.pending, (state, action) => {
                console.log("Pending update User:", action.payload);
            });
    },
});

export default userSlice.reducer;