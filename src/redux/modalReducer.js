import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpen: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state,action) => {
      state.isOpen = true;
    },
    closeModal: (state,action) => {
      state.isOpen = false;
    }
	},
});

// Action creators are generated for each case reducer function
export const {openModal,closeModal } = modalSlice.actions;

export default modalSlice.reducer;
