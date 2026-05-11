import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AdminValue = {
    isShrinkBar: boolean
}

const initialState: AdminValue = {
    isShrinkBar: false
}

const adminState = createSlice({
    name: 'admin', initialState,
    reducers: {
        setShrinkBar: (state, action: PayloadAction<boolean>) => {
            state.isShrinkBar = action.payload
        }
    }
})

export const { setShrinkBar } = adminState.actions
export default adminState.reducer