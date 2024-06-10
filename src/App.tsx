import "./App.css";
import ListOfUsers from "./components/ListOfUsers";
import { NewUser } from "./components/NewUser";
import { Toaster } from "sonner";

function App() {
  return (
    <main className="flex flex-col">
      <h1 className="my-4 text-2xl font-bold">CRUD con redux</h1>
      <section className="flex gap-2">
        <NewUser />
        <ListOfUsers />
        <Toaster richColors />
      </section>
    </main>
  );
}

export default App;
