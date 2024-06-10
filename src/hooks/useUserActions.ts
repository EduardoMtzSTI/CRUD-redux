import {
  userId,
  User,
  UserWithId,
  deleteUserById,
  addNewUser,
  updateUserById,
  selectUserById,
} from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const selectUser = (id: userId) => {
    return dispatch(selectUserById(id));
  };

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }));
  };

  const updateUser = ({ id, name, email, github }: UserWithId) => {
    dispatch(updateUserById({ id, name, email, github }));
  };

  const removeUser = (id: userId) => {
    dispatch(deleteUserById(id));
  };

  return { removeUser, addUser, updateUser, selectUser };
};
