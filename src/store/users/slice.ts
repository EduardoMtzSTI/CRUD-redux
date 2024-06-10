import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: "001",
    name: "John Doe",
    email: "john@gmail.com",
    github: "eduardomtzsti",
  },
  {
    id: "002",
    name: "Jane Smith",
    email: "jan@gmail.com",
    github: "sdcuike",
  },
  {
    id: "003",
    name: "David Clark",
    email: "DClark@gmail.com",
    github: "ali-bouali",
  },
  {
    id: "004",
    name: "Jane Smith",
    email: "smith@gmail.com",
    github: "rockcreation7",
  },
  {
    id: "005",
    name: "Mike Johnson",
    email: "mikjoh@gmail.com",
    github: "Toerktumlare",
  },
  {
    id: "006",
    name: "Alice Brown",
    email: "alice@gmail.com",
    github: "ghost",
  },
];

export type userId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: userId;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectUserById: (state, action: PayloadAction<userId>) => {
      const selectedUser = state.find(
        (user) => user.id === action.payload
      ) as UserWithId;
      console.log(selectedUser);
      return [selectedUser];
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      return [...state, { id, ...action.payload }];
    },
    updateUserById: (state, action: PayloadAction<UserWithId>) => {
      const updatedUser = action.payload as UserWithId;
      const isUserDefined = state.some((user) => user.id === updatedUser.id);
      if (!isUserDefined) {
        state.map((user) => {
          if (user.id === updatedUser.id) {
            user = updatedUser;
          }
        });
      }
    },
    deleteUserById: (state, action: PayloadAction<userId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollBackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserDefined = state.some((user) => user.id === action.payload.id);
      if (!isUserDefined) {
        state.push(action.payload);
      }
    },
  },
});

export default usersSlice.reducer;

export const {
  addNewUser,
  deleteUserById,
  updateUserById,
  selectUserById,
  rollBackUser,
} = usersSlice.actions;
