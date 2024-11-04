import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/loginRegister/state/slice"
import { UserReducerState } from "../features/loginRegister/state/slice"

const combineReducersApp = combineReducers({ userReducer });

const store = configureStore({
  reducer: combineReducersApp,
});

// export type StoreStateType = ReturnType<typeof store.getState>;
// export type StoreDispatchType = typeof store.dispatch;

// export const useAppDispatch: () => StoreDispatchType = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export default store;

export type ExplicitAppState = {
  userReducer: UserReducerState;
};
