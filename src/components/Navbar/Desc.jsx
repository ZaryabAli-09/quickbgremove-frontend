import DescVedio from "../../assets/desc.mp4";
function Desc() {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-between  lg:p-12  rounded-lg  p-6  sm:p-16 md:p-20">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0  lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-700 mb-4">
          Remove Backgrounds Instantly with QuickBGRemove!
        </h2>
        <p className="text-gray-700 mb-4">
          QuickBGRemove's advanced AI lets you remove backgrounds automatically
          in just 6 seconds. Enhance your editing workflow and save time with a
          single click!
        </p>
        <p className="text-gray-700">
          Whether you need a transparent background (PNG), a white backdrop, or
          simply want to isolate the subject, QuickBGRemove has you covered.
          Perfect for professionals and anyone looking to elevate their photo
          editing game.
        </p>
      </div>

      {/* Video Section */}
      <div className="lg:w-1/2 flex justify-center">
        <video width={400} loop autoPlay muted className="">
          <source src={DescVedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Desc;
