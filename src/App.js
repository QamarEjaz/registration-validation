import "./App.css";
import Login from "./pages/Login";
import Users from "./pages/users/AddUser";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/users/Home";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import User from "./pages/users/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/users" element={<Users />} />
        <Route path="/userdashbord" element={<Home />} />
        <Route exact path="/users/add" element={<AddUser />} />
        <Route exact path="/users/edit/:id" element={<EditUser />} />
        <Route exact path="/users/:id" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
