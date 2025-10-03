import DescVedio from "../assets/desc.mp4";
function Desc() {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-between  lg:p-12  rounded-lg  p-6  sm:p-16 md:p-20">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0  lg:text-left">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-700 mb-4">
          All-in-one AI background remover & generator
        </h2>
        <p className="text-gray-700 mb-4 lg:w-[70%]">
          QuickBgRemove lets you remove image backgrounds instantly with
          precision, making it easy to isolate subjects in just seconds.
        </p>

        <p className="text-gray-700 mb-4 lg:w-[70%]">
          You can also generate AI-powered backdrops from prompts, apply solid
          colors, use custom photos or Unsplash images, and resize your pictures
          all in one simple tool.
        </p>
      </div>

      {/* Video Section */}
      <div className="lg:w-1/2 flex justify-center">
        <video width={400} controls={false} loop autoPlay muted className="">
          <source src={DescVedio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default Desc;
