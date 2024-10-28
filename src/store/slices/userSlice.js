// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, followOrUnfollow } from "../../api/user";

// Thunk to fetch user profile
export const fetchUser = createAsyncThunk("user/fetchUser", async (id) => {
  const response = await getUser(id);
  return response.user;
});

// Thunk to follow/unfollow user
export const toggleFollowUser = createAsyncThunk(
  "user/toggleFollowUser",
  async (id, { getState }) => {
    await followOrUnfollow(id);
    const loggedUserId = localStorage.getItem("userId");
    const { user } = getState().user;

    return {
      id,
      isFollowing: user.followers.includes(loggedUserId),
      loggedUserId,
    };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFollowing: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isFollowing = action.payload.followers.includes(
          localStorage.getItem("userId")
        );
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch user profile.";
      })
      .addCase(toggleFollowUser.fulfilled, (state, action) => {
        const { id, isFollowing, loggedUserId } = action.payload;
        state.isFollowing = !isFollowing;
        if (isFollowing) {
          state.user.followers = state.user.followers.filter(
            (followerId) => followerId !== loggedUserId
          );
        } else {
          state.user.followers.push(loggedUserId);
        }
      });
  },
});

export default userSlice.reducer;
