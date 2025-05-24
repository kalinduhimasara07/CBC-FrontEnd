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
import LumineePrivacyPolicy from "./client/privacyPolicy";
import TermsOfService from "./client/termsOfServices";
import ReturnPolicy from "./client/returnPolicy";

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
          <Route path="/privacy" element={<LumineePrivacyPolicy/>} />
          <Route path="/terms" element={<TermsOfService/>} />
          <Route path="/return" element={<ReturnPolicy/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
