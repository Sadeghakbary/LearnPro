import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Course } from '../../types/course';
import { getCourses } from '../../services/courseService';

export const loadCourses = createAsyncThunk('course/load', async () => {
  return await getCourses();
});

interface CourseState {
  list: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  list: [],
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadCourses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(loadCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'خطا';
      });
  }
});

export default courseSlice.reducer;
