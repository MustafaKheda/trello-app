import { Route, Routes } from "react-router";
import "./App.css";
import Trello from "./Components/Broad/Trello";
import Login from "./Components/Login/Login";
import StageContainer from "./Components/Broad/StageContainer";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Trello" exact element={<Trello />} />
      <Route path="/container" element={<StageContainer />} />
    </Routes>
  );
}

export default App;
