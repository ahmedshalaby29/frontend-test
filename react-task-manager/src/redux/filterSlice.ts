import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: string;
}

const initialState: FilterState = {
  filter: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
