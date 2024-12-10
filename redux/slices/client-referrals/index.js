import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/interceptor";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

const initialState = {
    referrals: [],
    loading: false,
    error: null,
    status: null,
};

export const getAllReferrals = createAsyncThunk(
    "referral/getReferrals",
    async () => {
        try {
            const url = `${baseUrl}/referral/getReferrals`; // Adjust the endpoint based on your API
            const response = await axiosInstance.get(url);
            console.log(response.data.data, '<=== from slice')
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const clientReferralSlice = createSlice({
    name: "client-referrals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllReferrals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllReferrals.fulfilled, (state, action) => {
                state.loading = false;
                state.referrals = action?.payload?.data;
            })
            .addCase(getAllReferrals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default clientReferralSlice.reducer;
