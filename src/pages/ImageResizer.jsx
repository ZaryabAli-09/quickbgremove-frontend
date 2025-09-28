import { useState } from "react";
import resizeImg from "../assets/resize-hero-img.png";
import toast from "react-hot-toast";

const ImageResizer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState("1000");
  const [height, setHeight] = useState("1000");
  const [resizedImageURL, setResizedImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setResizedImageURL(null); // Clear the resized image when a new one is uploaded
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(file);
      setResizedImageURL(null); // Clear the resized image when a new one is uploaded
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage || !width || !height) {
      setError("Please select an image and specify width and height.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("width", width);
    formData.append("height", height);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tools/resizeImg`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Error occur while resizing image.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResizedImageURL(url);
      setLoading(false);
    } catch (err) {
      toast.error("Error occur while resizing image.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resizedImageURL;
    link.download = "resized_image.jpeg"; // Change this to the appropriate file extension if needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  {
    loading ? toast.loading("Resizing...") : toast.dismiss();
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 bg-gray-100">
        {/* Left Section */}
        <div className="p-8 lg:p-10 lg:w-[40%]">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 md:text-center lg:text-left">
            Free image resizer
          </h1>
          <p className="text-md md:text-center lg:text-left">
            Instantly resize your images to a custom size or for social media{" "}
            <span className="bg-indigo-600 rounded text-white px-2 py-1">
              Free
            </span>{" "}
          </p>
          <img className="w-[300px]" src={resizeImg} alt="resize-img-hero" />
        </div>

        {/* Right Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white  border border-gray-200 rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md lg:w-[60%]"
        >
          {/* Drag and Drop Area */}
          <div
            className="bg-gray-100 border-dashed border-2 rounded-lg p-4 mb-4 flex flex-col items-center justify-center cursor-pointer min-h-[200px] hover:bg-gray-200"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            <>
              {/* Show the selected or resized image */}
              {resizedImageURL ? (
                <img
                  src={resizedImageURL}
                  alt="Resized"
                  className="h-32 w-auto rounded mb-2"
                />
              ) : selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="h-64 w-auto object-contain rounded mb-2"
                />
              ) : (
                <p className="text-gray-500 opacity-50">
                  Drag and Drop Image or Click to Upload
                </p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </>
          </div>

          {/* Width and Height Inputs */}
          <div className="flex mb-4 space-x-4">
            <div className="flex-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 "
                htmlFor="width"
              >
                Width
              </label>

              <div className="flex items-center space-x-1 appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight">
                {" "}
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="w-20  focus:outline-none focus:shadow-outline"
                  placeholder="e.g 1000"
                />
                <span className="opacity-50">px</span>
              </div>
            </div>
            <div className="flex-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="height"
              >
                Height
              </label>
              <div className="flex items-center space-x-1 appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-20  focus:outline-none focus:shadow-outline placeh"
                  placeholder="e.g 500"
                />
                <span className="opacity-50">px</span>
              </div>
            </div>
          </div>

          {/* Resize and Download Buttons */}
          <div className="flex items-center justify-between">
            {selectedImage && (
              <button
                className="px-6 py-3 flex items-center hover:scale-105 ease-out duration-100 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-800 transition-colors"
                type="submit"
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
                Resize Image
              </button>
            )}
            {resizedImageURL && (
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
                Download
              </button>
            )}
          </div>
        </form>
      </div>
      {/* Responsive Pixel Chart */}
      <div className="bg-gray-100 shadow-md border  mx-auto border-gray-300 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-700 text-center">
          Image Size Guide
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {/* Card */}
          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-gray-800">Facebook</h3>
            <p className="text-xs text-gray-500">Profile Picture</p>
            <p className="mt-2 text-blue-600 font-bold text-sm">170 × 170</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-gray-800">Facebook</h3>
            <p className="text-xs text-gray-500">Cover Photo</p>
            <p className="mt-2 text-blue-600 font-bold text-sm">851 × 315</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-gray-800">Instagram</h3>
            <p className="text-xs text-gray-500">Post</p>
            <p className="mt-2 text-blue-600 font-bold text-sm">1080 × 1080</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition">
            <h3 className="text-sm font-semibold text-gray-800">Twitter</h3>
            <p className="text-xs text-gray-500">Header</p>
            <p className="mt-2 text-blue-600 font-bold text-sm">1500 × 500</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageResizer;
