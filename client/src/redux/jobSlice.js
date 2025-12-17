import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAppliedJobs: [], // Added this
        singleJob: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAppliedJobs: (state, action) => { // Added this
            state.allAppliedJobs = action.payload;
        }
    }
});
export const { setAllJobs, setSingleJob, setAllAppliedJobs } = jobSlice.actions;
export default jobSlice.reducer;