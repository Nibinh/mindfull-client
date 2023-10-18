import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ViewUser from "./pages/ViewUser";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/edituser/:id" element={<EditUser />} />
      <Route path="/viewUser/:id" element={<ViewUser />} />
    </Routes>
  );
}

export default App;
