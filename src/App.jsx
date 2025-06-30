import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfServices";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import DocumentScanner from "./pages/DocumentScanner";
import SignUp from "./pages/Signup";
import BatchProcessing from "./pages/BatchProcessing";
import ImageResizer from "./pages/ImageResizer";
import ReactGA from "react-ga";

const TRACKING_ID = "G-W4WYP0GGL4"; //Google Analytics ID
ReactGA.initialize(TRACKING_ID, {
  gaOptions: {
    cookieDomain: "auto", // Automatically set the cookie domain
  },
});

function App() {
  const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
      // Send a page view to Google Analytics whenever the route changes
      ReactGA.pageview(location.pathname + location.search);
    }, [location]);
  };
  usePageTracking(); // Custom hook to track page views
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch("https://quickbgremove-backend.onrender.com");
        const data = await res.json();
        console.log("Backend is running", data);
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };
    checkBackend();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/document-scanner" element={<DocumentScanner />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/batch-processing" element={<BatchProcessing />}></Route>
        <Route path="/image-resizer" element={<ImageResizer />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
