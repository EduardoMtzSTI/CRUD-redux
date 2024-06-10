import { configureStore, Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollBackUser, UserWithId } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddelware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
    console.log("guardar");
  };

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const previousState = store.getState();
    next(action);
    if (type === "users/deleteUserById") {
      const userIdToRemove = payload;
      const userToRemove = previousState.users.find(
        (user: UserWithId) => user.id === payload
      );

      fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
        method: "delete",
      })
        .then((res) => {
          if (res.ok) {
            toast.success(
              `Se elimino el usuario ${userIdToRemove} correctamente.`
            );
          }
          throw new Error("Error al eliminar el usuario.");
        })
        .catch((error) => {
          toast.error(`Error al eliminar el usuario ${userIdToRemove}.`);
          if (userToRemove) store.dispatch(rollBackUser(userToRemove));
          console.log("error:" + error);
        });
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistanceLocalStorageMiddelware,
      syncWithDatabaseMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
