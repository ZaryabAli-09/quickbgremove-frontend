// Upload.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ColorWheel from "../components/ColorWheel";
import { useColorWheel } from "../context/ColorWheelContext";
import { hsvaToHex } from "@uiw/color-convert";
import ImageCanvas from "../components/ImageCanvas";
import { toast } from "react-hot-toast";
import { FaImages } from "react-icons/fa6";
import { GrThreeDEffects } from "react-icons/gr";
import { IoIosCloudDownload } from "react-icons/io";
import { RiAiGenerate } from "react-icons/ri";

const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fileFromState = location.state?.file;

  const fileInputRef = useRef(null);
  const uploadPhotoRef = useRef(null);

  // States
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageDisplay, setLocalImageDisplay] = useState("");
  const [editBlob, setEditBlob] = useState(null);
  const [originalBgRemoveImage, setOriginalBgRemoveImage] = useState(null);

  const [isImageEnhanced, setIsImageEnhanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("background");
  const [bgActiveTab, setBgActiveTab] = useState("magic");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  const { hsva } = useColorWheel();
  const [unsplashImages, setUnsplashImages] = useState([]);

  const [prompt, setPrompt] = useState("");
  const [aiGeneratedImages, setAiGeneratedImages] = useState([]);
  const [aiGenImgLoading, setAiGenImgLoading] = useState(false);

  // Fetch images from Unsplash API
  async function getImagesFromUnsplash() {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos?per_page=10&page=1",
        {
          headers: {
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY
            }`,
            "Accept-Version": "v1",
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return;
      }
      setUnsplashImages([...result]);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Handle photo upload to add into bg gallery
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setUnsplashImages([
        { id: Date.now(), urls: { small_s3: URL.createObjectURL(file) } },
        ...unsplashImages,
      ]);
    }
  }

  // Handle new file selection for main image
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      setImageUrl("");
      setLocalImageDisplay(URL.createObjectURL(newFile));
      removeBackground(newFile);
    }
    navigate(".", { replace: true, state: { file: newFile } });
  };

  // Background removal logic
  const removeBackground = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tools/removebg`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const blob = await res.blob();

      const processedImageUrl = URL.createObjectURL(blob);
      setEditBlob(blob);
      setImageUrl(processedImageUrl);
      setOriginalBgRemoveImage({ blob, url: processedImageUrl });
    } catch (err) {
      toast.error("Failed to remove background.");
    } finally {
      setLoading(false);
    }
  };

  // Image enhancement
  async function handleUpscaleImg() {
    setLoading(true);

    if (isImageEnhanced) {
      setImageUrl(originalBgRemoveImage.url);
      setEditBlob(originalBgRemoveImage.blob);
      setIsImageEnhanced(false);
      setLoading(false);
      return;
    }

    if (!imageUrl || !editBlob) {
      toast.error("No image to enhance.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", editBlob, `processedImage.png`);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tools/upscaleImg`,
        { method: "POST", body: formData }
      );

      if (!response.ok) throw new Error("Enhancement failed.");
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      setEditBlob(blob);
      setImageUrl(url);
      setIsImageEnhanced(true);
    } catch {
      toast.error("Failed to enhance image.");
    } finally {
      setLoading(false);
    }
  }

  // on download processed image
  async function handleDownload() {
    try {
      setDownloadLoading(true);
      const formData = new FormData();

      if (!editBlob) {
        toast.error("No image to download.");
        return;
      }
      // Case 1: No background applied → just download the main image
      if (imageUrl && !bgColor && !selectedBgImage) {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `quickbgremove-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadLoading(false);
        return;
      }
      // Always send processed image blob
      formData.append("image", editBlob, "processedImage.png");

      // Case 2: Background color applied
      if (bgColor && !selectedBgImage) {
        formData.append("bgColor", bgColor);
      }
      if (selectedBgImage) {
        // If it’s a URL, let backend handle it
        if (
          typeof selectedBgImage === "string" &&
          selectedBgImage.startsWith("http")
        ) {
          const image = unsplashImages.find(
            (img) => img.urls.small_s3 === selectedBgImage
          );
          formData.append("bgImageUrl", image.urls.full);
        } else {
          // If it’s a locally uploaded file (blob URL from File input)
          const bgBlob = await fetch(selectedBgImage).then((res) => res.blob());
          formData.append("bgImage", bgBlob, "bgImage.png");
        }
      }

      // Send to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tools/mergingBgEdits`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Failed to download image.");
        setDownloadLoading(false);
        return;
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `quickbgremove-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl); // cleanup
      setDownloadLoading(false);
    } catch (error) {
      toast.error("Failed to download image.");
      setDownloadLoading(false);
    } finally {
      setDownloadLoading(false);
    }
  }

  async function generateImage() {
    try {
      if (!prompt || prompt.trim() === "") {
        toast.error("Prompt is required");
        return;
      }

      setAiGenImgLoading(true);
      // Send to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tools/generateImage`,
        {
          method: "POST",
          body: JSON.stringify({ prompt }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to generate image");
        setAiGenImgLoading(false);

        return;
      }

      setAiGeneratedImages([...aiGeneratedImages, result.imageUrl]);
      toast.success("Image generated successfully");
      setAiGenImgLoading(false);
    } catch (error) {
      toast.error(error.message || "Failed to generate image");
      setAiGenImgLoading(false);
    } finally {
      setAiGenImgLoading(false);
      setPrompt("");
    }
  }
  // get images from Unsplash
  useEffect(() => {
    getImagesFromUnsplash();
  }, []);

  // Reset on state file
  useEffect(() => {
    if (!fileFromState) return;

    if (fileFromState) {
      setFile(fileFromState);
      setLocalImageDisplay(URL.createObjectURL(fileFromState));
      removeBackground(fileFromState);
    }
  }, [fileFromState]);
  return (
    <div className=" bg-gray-100 pb-24  relative">
      {/* Top navbar */}
      <nav className="fixed -bottom-1 z-20 w-full  lg:relative  lg:max-w-2xl  md:mx-auto ">
        <div className="rounded-xl p-10  bg-white border border-gray-200 md:rounded-full  md:p-2 md:mb-4">
          <div className="flex rounded flex-wrap items-center justify-start gap-2 relative md:justify-center ">
            {/* Tabs */}
            <button
              onClick={() => {
                setActiveTab("background");
                setIsSidePanelOpen(true);
              }}
              className={`px-3 flex items-center justify-center gap-1 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "background"
                  ? "bg-gray-100 text-gray-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaImages className="text-lg" /> Background
            </button>
            <button
              onClick={() => {
                setActiveTab("effects");
                setIsSidePanelOpen(true);
              }}
              className={`px-3 flex items-center justify-center gap-1  py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "effects"
                  ? "bg-gray-100 text-gray-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <GrThreeDEffects className="text-lg" />
              Effects
            </button>

            {/* Download button */}
            <button
              disabled={downloadLoading}
              onClick={handleDownload}
              className="absolute right-0 md:absolute md:top-0 md:right-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosCloudDownload
                className={`text-lg ${downloadLoading && "animate-bounce"}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* side panel and canvas container  */}
      <div className="w-full md:max-w-7xl md:mx-auto flex flex-col  relative lg:flex-row">
        {isSidePanelOpen && (
          <div
            className={`
    mx-auto bg-white border border-gray-200 rounded-lg overflow-y-auto h-96
    fixed bottom-0 left-0 w-full z-40 lg:relative lg:w-96 bg-opacity-90
    transform-gpu transition-transform duration-1000 ease-out
    ${isSidePanelOpen ? "translate-y-0" : "translate-y-full"}
    lg:translate-y-0
  `}
          >
            <div>
              <button
                onClick={() => setIsSidePanelOpen(false)}
                className="absolute top-2 right-2 z-40 border shadow-sm rounded-full w-8 h-8 flex items-center justify-center hover:scale-110 transition-all duration-200 font-bold"
              >
                ✖
              </button>
            </div>
            {activeTab === "background" && (
              <div>
                {/* --- Tabs for bg options --- */}
                <div className="flex justify-center gap-3 text-gray-600  sticky top-0 z-20 backdrop-blur-sm pt-2 rounded-lg ">
                  <span
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      bgActiveTab === "color" &&
                      "bg-gray-700 text-white   font-semibold"
                    }`}
                    onClick={() => setBgActiveTab("color")}
                  >
                    Color
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      bgActiveTab === "photo" &&
                      "bg-gray-700  text-white font-semibold"
                    }`}
                    onClick={() => setBgActiveTab("photo")}
                  >
                    Photo
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      bgActiveTab === "magic" &&
                      "bg-gray-700 text-white font-semibold"
                    }`}
                    onClick={() => setBgActiveTab("magic")}
                  >
                    Magic
                  </span>
                </div>

                <div className="p-4">
                  {/* --- Magic Background Container --- */}
                  {bgActiveTab === "magic" && (
                    <div
                      className="
             
           
              flex flex-col gap-4 p-4
              rounded-t-2xl lg:rounded-2xl
              bg-gradient-to-b from-gray-50 to-white shadow-inner 
              z-40
            "
                    >
                      {/* Header + Close button */}
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1 space-y-1">
                          <h2 className="text-lg font-semibold text-gray-800">
                            ✨ Magic Backgrounds
                          </h2>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            Describe your dream background and let AI create it
                            for you.
                          </p>
                        </div>
                      </div>

                      {/* Input prompt */}
                      <div className="flex sm:flex-row items-center gap-3 mx-auto w-full max-w-2xl">
                        <input
                          value={prompt}
                          disabled={aiGenImgLoading}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="
                  flex-1 p-3 bg-white border border-gray-200 
                  rounded-xl shadow-sm text-sm placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-400
                  disabled:cursor-wait disabled:opacity-50
                "
                          type="text"
                          placeholder="e.g. Futuristic cityscape with neon lights"
                        />
                        <button
                          disabled={aiGenImgLoading}
                          onClick={generateImage}
                          className="
                  px-3 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                  text-white rounded-xl text-sm font-semibold shadow-md
                  hover:opacity-90 transition
                  disabled:cursor-wait disabled:opacity-50 disabled:animate-pulse
                "
                        >
                          <RiAiGenerate
                            className={`text-xl ${
                              aiGenImgLoading && "animate-ping"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Scrollable image list */}
                      <div
                        className="
                
                rounded-t-2xl lg:rounded-2xl
              grid grid-cols-4 lg:grid-cols-3 gap-2 p-4
              rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-inner
              "
                      >
                        {/* None option */}
                        <div
                          onClick={() => setSelectedBgImage(null)}
                          className="w-full aspect-square flex flex-col items-center justify-center 
                  border-2 border-dashed border-gray-300 rounded-xl 
                  text-gray-400 cursor-pointer hover:bg-gray-50 transition"
                        >
                          <span className="text-sm">None</span>
                        </div>

                        {/* AI generated images */}
                        {aiGeneratedImages?.length > 0 &&
                          aiGeneratedImages.map((img) => (
                            <div
                              onClick={() => setSelectedBgImage(img)}
                              key={img}
                              className="relative w-full aspect-square rounded-xl overflow-hidden 
                      cursor-pointer group shadow hover:scale-105 transition"
                            >
                              <img
                                src={img}
                                alt="Generated"
                                className="object-cover w-full h-full"
                              />
                              <div
                                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 
                      flex items-center justify-center text-white font-medium text-sm transition"
                              >
                                Use
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* --- Photo container --- */}
                  {bgActiveTab === "photo" && (
                    <div
                      className="
              rounded-t-2xl lg:rounded-2xl
              grid grid-cols-4 lg:grid-cols-3 gap-2 p-4
              rounded-2xl bg-gradient-to-b from-gray-50 to-white shadow-inner
              
            "
                    >
                      {/* None option */}
                      <div
                        onClick={() => setSelectedBgImage(null)}
                        className="w-full aspect-square flex flex-col items-center justify-center 
                border-2 border-dashed border-gray-300 rounded-xl 
                text-gray-400 cursor-pointer hover:bg-gray-50 transition"
                      >
                        None
                      </div>

                      {/* Upload option */}
                      <div
                        onClick={() => uploadPhotoRef.current.click()}
                        className="w-full aspect-square flex flex-col items-center justify-center 
                border-2 border-dashed border-gray-300 rounded-xl 
                text-gray-400 cursor-pointer hover:bg-gray-50 transition"
                      >
                        +
                      </div>
                      <input
                        type="file"
                        ref={uploadPhotoRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />

                      {/* Unsplash images */}
                      {unsplashImages.map((img) => (
                        <img
                          key={img.id}
                          src={img.urls.small_s3 || img.urls.small}
                          alt=""
                          className="relative w-full aspect-square rounded-xl 
                  cursor-pointer group shadow hover:scale-95 transition"
                          onClick={() => {
                            setSelectedBgImage(
                              img.urls.small_s3 || img.urls.small
                            );
                            setBgColor(null);
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* --- Color container --- */}
                  {bgActiveTab === "color" && (
                    <div
                      className="  rounded-2xl 
              bg-gradient-to-b from-gray-50 to-white shadow-inner "
                    >
                      {/* Scrollable area */}
                      <div className="  ">
                        {/* Sticky controls */}
                        <div className="  p-3  flex flex-wrap items-center ">
                          <button
                            onClick={() => {
                              setBgColor(null);
                              setSelectedBgImage(null);
                            }}
                            className="w-12 h-12 flex items-center justify-center 
                    border rounded-md text-sm text-gray-600 hover:bg-gray-100"
                          >
                            None
                          </button>
                          <button
                            onClick={() => {
                              setBgColor(hsvaToHex(hsva));
                              setSelectedBgImage(null);
                            }}
                            className="ml-auto px-3 py-2 rounded bg-gray-200 text-sm hover:bg-gray-300"
                          >
                            Apply
                          </button>
                        </div>

                        {/* Color wheel */}
                        <div className="px-1 ">
                          <ColorWheel />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* --- Effects tab --- */}
            {activeTab === "effects" && (
              <div className="p-10">
                <button
                  onClick={handleUpscaleImg}
                  className={`w-full px-4 py-2  rounded-full font-medium shadow transition ${
                    isImageEnhanced
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-pulse"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isImageEnhanced ? "✨ Enhanced" : "Enhance ✨"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main image preview */}
        <div className="flex-1 w-[100vw]  sm:max-w-3xl mx-auto ">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <ImageCanvas
            selectedBgImage={selectedBgImage}
            bgColor={bgColor}
            imageUrl={imageUrl}
            localImageDisplay={localImageDisplay}
            loading={loading}
            hsva={hsva}
            hsvaToHex={hsvaToHex}
          />

          {/* Upload another button */}
          <div className="flex justify-center ">
            <button
              onClick={() => fileInputRef.current.click()}
              className="h-12 w-12 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 hover:border-blue-400 bg-white shadow-sm hover:shadow-md transition"
              title="Upload another"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
