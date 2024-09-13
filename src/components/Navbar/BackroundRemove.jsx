import { useState, useRef } from "react";
import HeroVedio from "../../assets/hero1.mp4";
import image1 from "../../assets/11.webp";
import image2 from "../../assets/22.webp";
import image3 from "../../assets/33.webp";
import image4 from "../../assets/44.webp";
import { useNavigate } from "react-router-dom";

function BackgroundRemoveComp() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageDisplay, setLocalImageDisplay] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const fileInputRef = useRef(null); // Reference for the hidden file input

  // upload button click logic
  const handleButtonClick = () => {
    fileInputRef.current.click();
    setImageUrl("");
  };

  // when choose file pop and we select an image we set the file to that image files data and create objecturl from it and locally display the image on screen this what handleFileinput does
  function handleFileInput(e) {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    setLocalImageDisplay(URL.createObjectURL(e.target.files[0]));
  }

  // this uploadFile logic runs when we click on background remove button we send file to server wheich then server remove bg from it and return the file which we then catch the file in blob and create url from it set image url to that blob generated url and hide the local image from screen
  async function uploadFile() {
    if (!file) {
      return alert("Please choose an image");
    }
    const formData = new FormData();
    formData.append("image", file);

    // Start loading effect
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        const processedImageUrl = URL.createObjectURL(blob);
        setLocalImageDisplay(""); // Hide local image
        setImageUrl(processedImageUrl); // Show processed image
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false); // Stop loading effect
    }
  }

  // this logic simply allow to drag file to uploader container
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setLocalImageDisplay(URL.createObjectURL(droppedFile));
      setImageUrl(""); // Reset processed image
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // download button logic
  const handleDownload = () => {
    if (!imageUrl) {
      return alert("No image to download");
    }
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "processed-image.png";
    link.click();
  };

  // this function convert the src which is render in the frontend to file deatils and then we set the file to send it to server for processing
  async function handleImageClick(e) {
    const src = e.target.src;
    const imageName = src.split("/").pop();

    try {
      const res = await fetch(src);
      const blob = await res.blob();

      const file = new File([blob], imageName, { type: blob.type });
      setFile(file);
      setLocalImageDisplay(src);
    } catch (err) {
      alert("Error converting image src to file");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center p-4  lg:flex-row">
      <div className="mt-3 flex flex-col items-center gap-4 justify-center lg:mt-6 ">
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
      </div>
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
                Please wait <span className="font-extrabold">FixAndPolish</span>{" "}
                Robots are working on you image
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
              src={image2}
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
            <span
              onClick={() => navigate("/terms-of-service")}
              className="cursor-pointer underline font-bold"
            >
              Terms of Service
            </span>
            . To learn more about how quickbgremove handles your data, check our{" "}
            <span
              onClick={() => navigate("/privacy-policy")}
              className="cursor-pointer underline font-bold"
            >
              Privacy Policy
            </span>
            .
          </p>
        </div>
        {file &&
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
              className="px-6 py-3 flex items-center hover:scale-105 ease-out duration-100 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-800 transition-colors"
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
          ))}
      </div>
    </div>
  );
}

export default BackgroundRemoveComp;
