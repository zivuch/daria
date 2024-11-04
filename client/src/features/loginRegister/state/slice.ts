import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ExplicitAppState } from "../../../app/store"
import { UserInterface } from "../../../model/user";

export type UserReducerState = {
    user: UserInterface;
  };

const initialState: UserReducerState = {
    user: {
        id: 0,
        email: '', 
        first_name: '',
        family_name: '',
        username: ''
    }
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserInterface>) => {      
            state.user = action.payload;
        }
    }
})

// export const userState = (state: ExplicitAppState) => state.userReducer.user; // do i need it?

export const { setUser } = userSlice.actions;
export default userSlice.reducer;