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

function App() {
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
