import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";

import Signup from "./pages/signup";
import Login from "./pages/login";
import AdminPage from "./pages/admin/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import LumineeFAQ from "./client/faq";
import ScrollToTop from "./utils/scrolltotop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <ScrollToTop/>
        <Routes path="/*">
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="testing" element={<TestPage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/faq" element={<LumineeFAQ/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
