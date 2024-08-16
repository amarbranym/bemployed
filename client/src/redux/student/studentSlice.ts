import { qualificationSchema } from "@/components/forms/SchemaData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setContact: (state, action: PayloadAction<any>) => {
      state.contacts = action.payload;
    },
  },
});

export const { setContact } = studentSlice.actions;

export default studentSlice.reducer;
