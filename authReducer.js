import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log("User Logged In", data)
      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in');
      }
      localStorage.setItem("user", JSON.stringify(data))
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
async ({username, email, password}, {rejectWithValue}) => {
    try {
        const response = await fetch('https://dummyjson.com/users/add', {
            meethod: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({username,email,password})
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
}
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
