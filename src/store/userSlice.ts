import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  mobileNumber: string;
  password: string;
  title?: string;
  fullName?: string;
  dob?: string;
  currentAddress?: string;
  employmentStatus?:string;
  additionalSavings?:string
  livedDuration?: string;
  aboutYou?: string;
  signupStep: number;
}

const initialState: UserState = {
  email: '',
  mobileNumber: '',
  password: '',
  signupStep: 0
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    setSignupStep: (state, action: PayloadAction<number>) => {
      state.signupStep = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, setSignupStep, resetUser } = userSlice.actions;
export default userSlice.reducer;
