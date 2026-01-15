import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import backendApi from "../../api/backendApi";
import { toast } from "sonner";
import axios from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  uploadCount: number;
  downloadCount: number;
}

interface AuthState {
  loggedInUser: User | null;
  loading: boolean;
}

interface SignUpPayload{
    username: string;
    email:string;
    password:string;
}

interface AuthResponse{
    success: boolean;
    message: string;
    data?: User;
    user?: {
        token: string;
    };
}

const initialState: AuthState = {
  loggedInUser: null,
  loading: false,
};

export const signUpUser = createAsyncThunk<void,SignUpPayload, {rejectValue: string} >("auth/sign-up-user", async (payload) => {
    try {
        const {data} = await backendApi.post<AuthResponse>("/api/v1/auth/signup",payload)
        if(data.success){
            toast.success(data.message)
        }
        else{
            toast.warning(data.message)
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const responseMessage = error.response?.data?.message;
            const message =
                typeof responseMessage === "string"
                    ? responseMessage
                    : "Request failed";
            toast.warning(message);
            return;
        }
        toast.warning("Request failed");
    }
});

export const signInUser = createAsyncThunk<void, {email:string; password:string}, {rejectValue: string} >("auth/sign-in-user", async (payload) => {
    try {
      console.log("Payload in signInUser thunk:", payload);
        const {data} = await backendApi.post<AuthResponse>("/api/v1/auth/signin",payload)
        console.log("Response data in signInUser thunk:", data);
        if(data.success){
            const token = data.data?.token ?? data.user?.token;
            toast.success(data.message)
            if(token){
                localStorage.setItem("token",token)
                window.location.reload();
                return;
            }
            toast.warning("Login succeeded but token missing");
            return;
        }
        toast.warning(data.message)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const responseMessage = error.response?.data?.message;
            const message =
                typeof responseMessage === "string"
                    ? responseMessage
                    : "Request failed";
            toast.warning(message);
            return;
        }
        toast.warning("Request failed");
    }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;
      });
  },  
});



export const authReducer = authSlice.reducer;

export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
