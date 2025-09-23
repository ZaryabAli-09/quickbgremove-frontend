import { useState, useRef } from "react";
import HeroVedio from "../../assets/hero1.mp4";
import image1 from "../../assets/11.webp";
import image3 from "../../assets/33.webp";
import image4 from "../../assets/44.webp";
import { Link, useNavigate } from "react-router-dom";

// bug to be solve : when image is processed and return by server and then we click on try one of these image it donot reflect on ui and when we click on uload then automatically it reflects

function BackgroundRemoveComp() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: adds smooth scrolling
    });
  };

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageDisplay, setLocalImageDisplay] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const fileInputRef = useRef(null); // Reference for the hidden file input

  // upload button click logic
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // when choose file pop and we select an image we set the file to that image files data and create objecturl from it and locally display the image on screen this what handleFileinput does
  function handleFileInput(e) {
    if (e.target.files[0]) {
      navigate("/upload", { state: { file: e.target.files[0] } });
    }
  }

  // this function allow to drag file to uploader container
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // this logic simply allow to drag file to uploader container
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      navigate("/upload", { state: { file: droppedFile } });
    }
  };

  // download button logic

  // this function convert the src which is render in the frontend to file deatils and then we set the file to send it to server for processing
  async function handleImageClick(e) {
    const src = e.target.src;
    const imageName = src.split("/").pop();

    try {
      const res = await fetch(src);
      const blob = await res.blob();

      const file = new File([blob], imageName, { type: blob.type });

      navigate("/upload", { state: { file: file } });
    } catch (err) {
      alert("Error converting image src to file");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center p-4  lg:flex-row">
      {/* <div className="mt-3 flex flex-col items-center gap-4 justify-center lg:mt-6 ">
        <div className="video-container">
          <video width={300} loop autoPlay muted className="rounded-xl">
            <source src={HeroVedio} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold text-gray-700">
          Remove Image Background
        </h1>
        <p className="font-bold text-xl">
          100% Automatically and{" "}
          <span className="bg-indigo-600 rounded text-white px-2 py-1">
            Free
          </span>{" "}
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/png, image/jpeg"
          onChange={handleFileInput}
        />

        <button
          onClick={handleButtonClick}
          className="my-5 text-sm px-3 font-bold py-6 flex items-center  transition-transform duration-500 transform scale-100 hover:scale-110  black border-2 rounded-full shadow-md shadow-indigo-600 hover:bg-gray-50 "
        >
          Upload
        </button>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="mb-4 w-full max-w-sm h-72 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 relative"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"></div>
              <p className="text-xs my-4">
                Please wait{" "}
                <span className="font-extrabold">QuickBgRemove</span> Robots are
                working on you image
              </p>
            </div>
          ) : localImageDisplay || imageUrl ? (
            <img
              loading="lazy"
              className="w-full h-full object-contain"
              src={imageUrl || localImageDisplay}
              alt="Selected"
            />
          ) : (
            "Drag & Drop Image Here or Click to Upload"
          )}
        </div>
        <div
          className=" font-li
           text-center"
        >
          <p className="font-bold  text-gray-600 text-lg mb-2">
            No image? Try one of these:
          </p>
          <div className="flex items-center justify-center gap-2">
            {" "}
            <img
              loading="lazy"
              onClick={handleImageClick}
              className=" cursor-pointer w-[50px] h-[50px] object-cover rounded-lg"
              src={image1}
              alt=""
            />
            <img
              loading="lazy"
              onClick={handleImageClick}
              className=" cursor-pointer w-[50px] h-[50px] object-cover rounded-lg"
              src={image3}
              alt=""
            />
            <img
              loading="lazy"
              onClick={handleImageClick}
              className=" cursor-pointer w-[50px] h-[50px] object-cover rounded-lg"
              src={image4}
              alt=""
            />
          </div>

          <p className="text-xs mt-4 text-gray-600 mb-4">
            By uploading an image or URL you agree to our{" "}
            <Link
              className="cursor-pointer underline font-bold"
              onClick={scrollToTop}
              to={"/terms-of-service"}
            >
              Terms of Service
            </Link>
            . To learn more about how quickbgremove handles your data, check our{" "}
            <Link
              className="cursor-pointer underline font-bold"
              onClick={scrollToTop}
              to={"/privacy-policy"}
            >
              Privacy policy
            </Link>
            .
          </p>
        </div>
        {/* {file &&
          (!imageUrl ? (
            <button
              className="px-6 py-3 flex items-center hover:scale-105 ease-out duration-100 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-800 transition-colors"
              onClick={uploadFile}
            >
              <svg
                className="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Remove Background
            </button>
          ) : (
            <button
              className="px-6 py-3 flex items-center hover:scale-105 ease-out duration-100 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-800 transition-colors"
              onClick={handleDownload}
            >
              <svg
                className="relative w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              Download Image
            </button>
          ))} */}
      </div>
    </div>
  );
}

export default BackgroundRemoveComp;
