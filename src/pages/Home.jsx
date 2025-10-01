import SliderComponent from "../components/SliderComponent";
import Desc from "../components/Desc";
import BackgroundRemoveComp from "../components/BackroundRemove";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <BackgroundRemoveComp />
      <div className="flex items-center justify-center h-screen">
        <SliderComponent />
      </div>
      <div className="flex items-center justify-center h-screen">
        <Desc />
      </div>
      <Footer />
    </>
  );
}

export default Home;
