import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: ''
};

const mentorSlice = createSlice({
    name: "mentor",
    initialState: initialState,
    reducers: {
        setMentorInfo: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        resetMentorInfo: () => {
            return initialState;
        }
    }
});

export const { setMentorInfo , resetMentorInfo} = mentorSlice.actions;

export default mentorSlice;
