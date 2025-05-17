import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import HomePage from "./pages/home";

import Signup from "./pages/signup";
import Login from "./pages/login";
import AdminPage from "./pages/admin/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes path="/*">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="testing" element={<TestPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
