import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/Layout";

import { Camera } from "./pages/camera/Camera";
import { CameraForm } from "./components/camera/Form";
import { EditCamera } from "./pages/camera/EditCamera";

import { Users } from "./pages/users/Users";
import { UsersForm } from "./components/users/Form";

import { Orders } from "./pages/orders/Orders";
import { createCamera, createUser } from "./services/api/utils";

import { EditUser } from "./pages/users/EditUser";
import { Login } from "./components/Login";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />} >
        <Route path="/camera" element={<Camera />} />
        <Route path="/camera/form" element={<CameraForm onSave={(payload) => createCamera(payload)} />} />
        <Route path="/camera/edit/:id" element={<EditCamera />} />

        <Route path="/orders" element={<Orders />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/form" element={<UsersForm onSave={(payload) => createUser(payload)} />} />
        <Route path="/user/edit/:id" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default App;
