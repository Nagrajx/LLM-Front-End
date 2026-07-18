import { createSlice } from "@reduxjs/toolkit";

let user = null;

try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  user = null;
}

const initialState = {
  user,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
