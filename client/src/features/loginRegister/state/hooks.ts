import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { useCallback } from "react";
import { setUser } from "./slice";
import { UserInterface } from "../../../model/user";

// set user
export const useSetUser = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (user: UserInterface) => {
      dispatch(setUser(user));
    },
    [dispatch]
  );
};

// get user
export const useSelectUser = () => {
  return useAppSelector((state) => state.userReducer.user);
  };