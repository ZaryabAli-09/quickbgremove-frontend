// Upload.jsx
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ColorWheel from "../components/ColorWheel";
import { useColorWheel } from "../context/ColorWheelContext";
import { hsvaToHex } from "@uiw/color-convert";
import ImageCanvas from "../components/ImageCanvas";
import { toast } from "react-hot-toast";

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

  const [activeTab, setActiveTab] = useState("");
  const [bgActiveTab, setBgActiveTab] = useState("photo");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const [selectedBgImage, setSelectedBgImage] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  const { hsva } = useColorWheel();
  const [unsplashImages, setUnsplashImages] = useState([]);

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
    } catch (error) {
      toast.error("Failed to download image.");
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
    <div className="min-h-screen bg-gray-100 py-6 px-3 sm:px-6 lg:px-8">
      {/* Top navbar */}
      <nav className="max-w-2xl mx-auto mb-6">
        <div className="bg-white rounded-full border border-gray-200 p-2">
          <div className="flex flex-wrap items-center justify-start md:justify-center gap-2 relative">
            {/* Tabs */}
            <button
              onClick={() => {
                setActiveTab("background");
                setIsSidePanelOpen(true);
              }}
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "background"
                  ? "bg-gray-100 text-gray-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Background
            </button>
            <button
              onClick={() => {
                setActiveTab("effects");
                setIsSidePanelOpen(true);
              }}
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === "effects"
                  ? "bg-gray-100 text-gray-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Effects
            </button>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="absolute right-0 md:absolute md:top-0 md:right-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium shadow hover:bg-blue-600 transition"
            >
              Download
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 relative">
        {/* Side panel */}
        {isSidePanelOpen && (
          <div
            className="w-[80%] mx-auto lg:w-80 bg-white border border-gray-200 rounded-lg p-4
                max-h-[80vh] md:max-h-[60vh] overflow-hidden "
          >
            {activeTab === "background" && (
              <div>
                {/* Tabs for bg options */}
                <div className="flex justify-center gap-3 mb-4">
                  <span
                    className={`px-3   py-1 rounded-full text-xs cursor-pointer ${
                      bgActiveTab === "color" && "bg-gray-200 font-semibold"
                    }`}
                    onClick={() => {
                      setBgActiveTab("color");
                    }}
                  >
                    Color
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      bgActiveTab === "photo" && "bg-gray-200 font-semibold"
                    }`}
                    onClick={() => {
                      setBgActiveTab("photo");
                    }}
                  >
                    Photo
                  </span>
                </div>

                {/* Bg selection */}
                {bgActiveTab === "photo" && (
                  <div className="grid grid-cols-4 md:grid-cols-3 gap-2 h-auto md:h-96 overflow-hidden overflow-y-scroll">
                    <div
                      onClick={() => setSelectedBgImage(null)}
                      className="w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center border rounded-md text-gray-400 cursor-pointer"
                    >
                      None
                    </div>
                    <div
                      onClick={() => uploadPhotoRef.current.click()}
                      className="w-12 h-12 sm:w-20 sm:h-20 flex items-center justify-center border rounded-md text-3xl text-gray-400 cursor-pointer"
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
                    {unsplashImages.map((img) => (
                      <img
                        key={img.id}
                        src={img.urls.small_s3 || img.urls.small}
                        alt=""
                        className="w-12 h-12 sm:w-20 sm:h-20  object-cover rounded-md cursor-pointer hover:opacity-80"
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

                {bgActiveTab === "color" && (
                  <div className="mt-4">
                    {/* Scrollable container */}
                    <div className="h-80 overflow-y-auto pr-2">
                      {/* Sticky top bar with controls */}
                      <div className="sticky top-0 bg-white z-10 py-2 border-b flex flex-wrap items-center gap-2">
                        {/* None option */}
                        <button
                          onClick={() => {
                            setBgColor(null);
                            setSelectedBgImage(null);
                          }}
                          className="w-12 h-12 flex items-center justify-center border rounded-md text-sm text-gray-600 hover:bg-gray-100"
                        >
                          None
                        </button>

                        {/* Apply button (always visible in sticky bar) */}
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
                      <div className="px-1 py-4">
                        <ColorWheel />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "effects" && (
              <button
                onClick={handleUpscaleImg}
                className={`w-full px-4 py-2 rounded-full font-medium shadow transition ${
                  isImageEnhanced
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-pulse"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {isImageEnhanced ? "✨ Enhanced" : "Enhance✨  "}
              </button>
            )}
          </div>
        )}

        {/* Main image preview */}
        <div className="flex-1 w-[80vw]  sm:max-w-3xl mx-auto">
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
          <div className="flex justify-center mt-4">
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
