import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = state.products.find((item) => item.id === action.payload.id);
			if (item) {
				item.quantity += action.payload.quantity;
			} else {
				state.products.push(action.payload);
			}
		},
		removeItem: (state, action) => {
			state.products = state.products.filter(
				(item) => item.id !== action.payload
			);
		},
		resetCart: (state) => {
			state.products = [];
		},
		incrementQuantity: (state, action) => {
			const item = state.products.find((item) => item.id === action.payload);
			if (item) {
				item.quantity += 1;
			}
		},
		decrementQuantity: (state, action) => {
			const item = state.products.find((item) => item.id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addToCart,
	removeItem,
	resetCart,
	incrementQuantity,
	decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
