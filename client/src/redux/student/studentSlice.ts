import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  schools: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setContact: (state, action: PayloadAction<any>) => {
      state.contacts = action.payload;
    },
    setSchool: (state, action: PayloadAction<any>) => {
      state.schools = action.payload;
    },
  },
});

export const { setContact , setSchool} = studentSlice.actions;

export default studentSlice.reducer;
