import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/interceptor";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const initialState = {
    myProfile: null,
    loading: false,
    error: null,
    status: null,
};

export const getMyProfile = createAsyncThunk(
    "users/getMyProfile",
    async ({ id }) => {
        try {
            const url = `${baseUrl}/users/${id}`; // Adjust the endpoint based on your API
            const response = await axiosInstance.get(url);
            // console.log(response, 'from reducer')
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const myProfileSlice = createSlice({
    name: "myProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMyProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.myProfile = action?.payload?.data;
            })
            .addCase(getMyProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default myProfileSlice.reducer;
