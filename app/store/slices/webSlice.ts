import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WebState = {
  isLoad: boolean;
  isLeftBar: boolean;
  status: string;
  lang: "vie" | "eng"
  theme: "light" | "dark"
};

const initialState: WebState = {
  isLeftBar: false,
  isLoad: true,
  status: "good",
  lang: "vie",
  theme: 'light'
};

const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    setLoad: (state, action: PayloadAction<boolean>) => {
      state.isLoad = action.payload;
    },
    setLeftBar: (state, action: PayloadAction<boolean>) => {
      state.isLeftBar = action.payload;
    },
  },
});

export const { setLoad, setLeftBar } = webSlice.actions;
export default webSlice.reducer;
