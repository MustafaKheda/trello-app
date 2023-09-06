import { Route, Routes } from "react-router";
import "./App.css";
import Trello from "./Components/Broad/Trello";
import Login from "./Components/Login/Login";
import List from "./Components/Broad/List";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Trello" exact element={<Trello />} />
      <Route path="/List" exact element={<List />} />
    </Routes>
  );
}

export default App;
