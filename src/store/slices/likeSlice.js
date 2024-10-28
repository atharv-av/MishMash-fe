// features/likes/likesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likeOrDislikePost } from '../../api/post';

export const toggleLike = createAsyncThunk(
  'likes/toggleLike',
  async (postId) => {
    const response = await likeOrDislikePost(postId);
    return { postId, likes: response };
  }
);

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likeCounts: {},
    status: 'idle',
    error: null
  },
  reducers: {
    initializeLikes: (state, action) => {
      const { postId, count } = action.payload;
      if (!state.likeCounts[postId]) {
        state.likeCounts[postId] = count;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { postId, likes } = action.payload;
        state.likeCounts[postId] = likes.length;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Selectors
export const selectLikeCount = (state, postId) => 
  state.likes.likeCounts[postId] || 0;

export const selectLikeStatus = (state) => 
  state.likes.status;

export const { initializeLikes } = likesSlice.actions;
export default likesSlice.reducer;