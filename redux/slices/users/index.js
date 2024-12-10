import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/interceptor";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const initialState = {
    users: [],
    loading: false,
    error: null,
    status: null,
};

// export const getAllUsers = createAsyncThunk(
//     "users/getAllUsers",
//     async (token) => {
//         try {
//             const url = `${baseUrl}/users`; // Adjust the endpoint based on your API
//             const response = await axios.get(url, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'accessToken': token,
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     }
// );

export const getAllUsers = createAsyncThunk(
    "users/getAllUsers",
    async () => {
        try {
            const url = `${baseUrl}/users/getUsers`; // Adjust the endpoint based on your API
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action?.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;
