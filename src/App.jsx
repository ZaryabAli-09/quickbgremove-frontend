import { useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfServices";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignUp from "./pages/Signup";
import ImageResizer from "./pages/ImageResizer";
import Upload from "./pages/Upload";

function App() {
  async function checkBackend() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/`);
      const respnse = await fetch(`https://zaryab009-remove-bg-api.hf.space/`);
      console.log(respnse);
      const data = await res.json();
      console.log("Backend is running ->", data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  }

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/image-resizer" element={<ImageResizer />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
