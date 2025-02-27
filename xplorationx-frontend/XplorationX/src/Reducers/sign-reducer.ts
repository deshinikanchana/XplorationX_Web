import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "../Models/User.ts";
import axiosInstance from "./axiosInstance.ts";

const initialState = {
    userId:null,
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
};


export const registerUser= createAsyncThunk(
    'user/register',
    async (user : User)=>{
        try{
            const response = await axiosInstance.post('/auth/register', {user},{withCredentials: true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async (user: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', { user }, { withCredentials: true });
            console.log("Response here ", response.data);

            // Store tokens in localStorage
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            return response.data;
        } catch (err) {
            console.log("Login Error : ", err);
            return rejectWithValue(err.message);
        }
    }
);


const signSlice = createSlice({
    name: 'sign',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
            .addCase(registerUser.pending,(state, action)=>{
                console.log('Register Pending');
            })
            .addCase(registerUser.fulfilled,(state, action)=>{
                console.log('User Registered Successfully');
            })
            .addCase(registerUser.rejected,(state, action)=>{
                state.error = action.payload as string;
            });
        builder
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.fulfilled,(state, action)=>{
                state.jwt_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.pending,(state, action)=>{
                state.isAuthenticated = false;
            })

    }
});

export const {logOutUser} = signSlice.actions;
export default signSlice.reducer;