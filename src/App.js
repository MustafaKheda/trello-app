import { Route, Routes } from "react-router";
import "./App.css";
import TaskHub from "./Components/Broad/TaskHub";
import Login from "./Components/Login/Login";
import List from "./Components/Broad/List";
import ProfilePage from "./Components/Profile/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/task-hub" exact element={<TaskHub />} />
      <Route path="/profile" exact element={<ProfilePage />} />
      <Route path="/list" exact element={<List />} />
    </Routes>
  );
}

export default App;
