import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home";

import Signup from "./pages/signup";
import Login from "./pages/login";
import AdminPage from "./pages/admin/adminPage";
import { Toaster } from "react-hot-toast";
import LumineeFAQ from "./client/faq";
import ScrollToTop from "./utils/scrolltotop";
import LumineePrivacyPolicy from "./client/privacyPolicy";
import TermsOfService from "./client/termsOfServices";
import ReturnPolicy from "./client/returnPolicy";
import SkincareGuide from "./client/skincareGuide";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <ScrollToTop />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Routes path="/*">
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/faq" element={<LumineeFAQ />} />
            <Route path="/privacy" element={<LumineePrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/return" element={<ReturnPolicy />} />
            <Route path="/skincare" element={<SkincareGuide />} />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
