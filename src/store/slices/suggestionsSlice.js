// store/suggestionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSuggestedUsers, followOrUnfollow } from '../../api/user';

// Async thunk to fetch suggested users
export const fetchSuggestedUsers = createAsyncThunk(
  'suggestions/fetchSuggestedUsers',
  async () => {
    const users = await getSuggestedUsers();
    return users;
  }
);

// Slice
const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState: {
    suggestedUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleFollow: (state, action) => {
      const userId = action.payload;
      const user = state.suggestedUsers.find((user) => user._id === userId);
      if (user) {
        user.isFollowing = !user.isFollowing;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedUsers.fulfilled, (state, action) => {
        state.suggestedUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuggestedUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { toggleFollow } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
