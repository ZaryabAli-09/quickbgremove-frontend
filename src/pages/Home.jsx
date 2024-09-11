import SliderComponent from "../components/Navbar/SliderComponent";
import Desc from "../components/Navbar/Desc";
import BackgroundRemoveComp from "../components/Navbar/BackroundRemove";

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
    </>
  );
}

export default Home;
