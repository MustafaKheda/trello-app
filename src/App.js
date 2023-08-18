import { Route, Routes } from "react-router";
import "./App.css";
import Trello from "./Components/Broad/Trello";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Trello" exact element={<Trello />} />
    </Routes>
  );
}

export default App;
