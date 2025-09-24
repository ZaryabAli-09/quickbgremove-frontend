import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Upload = () => {
  const location = useLocation();
  const fileFromState = location.state?.file;
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageDisplay, setLocalImageDisplay] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Background removal logic
  const removeBackground = async (file) => {
    if (!file) return setError("Please choose an image");
    if (!file.type.startsWith("image/"))
      return setError("Please select a valid image file");

    setLoading(true);
    setError("");

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

      setLocalImageDisplay("");
      setImageUrl(processedImageUrl);
    } catch (err) {
      console.error("Background removal error:", err);
      setError(err.message || "Failed to remove background. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // File change
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      setFile(newFile);
      setImageUrl("");
      setError("");
      setLocalImageDisplay(URL.createObjectURL(newFile));
      removeBackground(newFile);
    }
  };

  // Trigger hidden input
  const handleUploadAnother = () => fileInputRef.current?.click();

  // Download file
  const handleDownload = () => {
    if (!imageUrl) return setError("No image available for download");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `background-removed-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsSidePanelOpen(true);
  };

  // Close side panel
  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  useEffect(() => {
    if (fileFromState) {
      setFile(fileFromState);
      setLocalImageDisplay(URL.createObjectURL(fileFromState));
      removeBackground(fileFromState);
    }
  }, [fileFromState]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Responsive Navbar */}
      <nav className="max-w-xl mx-auto mb-8">
        <div className="bg-white rounded-full  border border-gray-200 p-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            {/* Tabs */}
            <div className="flex  gap-2 justify-center ">
              <button
                onClick={() => handleTabClick("background")}
                className={`px-2 py-2 rounded-full font-semibold text-sm  transition-all duration-200 ${
                  activeTab === "background"
                    ? "bg-gray-100 text-gray-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Background
              </button>
              <button
                onClick={() => handleTabClick("upscale")}
                className={`px-2 py-2 rounded-full font-semibold text-sm  transition-all duration-200 ${
                  activeTab === "upscale"
                    ? "bg-gray-100 text-gray-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Upscale
              </button>
              <button
                onClick={() => handleTabClick("resize")}
                className={`px-2 py-2 rounded-full font-semibold text-sm  transition-all duration-200 ${
                  activeTab === "resize"
                    ? "bg-gray-100 text-gray-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Resize
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="absolute top-0 right-1 px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-2">
        {/* Side Panel */}
        {isSidePanelOpen && (
          <div className="lg:w-80 bg-white  border border-gray-200 rounded-md p-4  h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {activeTab} Settings
              </h3>
              <button
                onClick={handleCloseSidePanel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {activeTab === "background" && (
                <div className="text-gray-600">
                  <p>Background removal settings will appear here.</p>
                </div>
              )}

              {activeTab === "upscale" && (
                <div className="text-gray-600">
                  <p>Upscale settings will appear here.</p>
                </div>
              )}

              {activeTab === "resize" && (
                <div className="text-gray-600">
                  <p>Resize settings will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className={`flex-1 ${
            isSidePanelOpen ? "lg:max-w-2xl" : "max-w-2xl"
          } mx-auto`}
        >
          {/* Hidden input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Image Preview Container */}
          <div className="bg-white rounded-2xl  p-6 mb-8 border border-gray-200">
            <div
              className={`relative w-full h-96 border border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 ${
                loading ? "bg-gray-50" : "bg-white"
              }`}
            >
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center max-w-xs">
                    <span className="font-semibold text-blue-600">
                      QuickBgRemove
                    </span>{" "}
                    is processing your image...
                  </p>
                </div>
              ) : localImageDisplay || imageUrl ? (
                <img
                  loading="lazy"
                  className="w-full h-full object-contain rounded-lg"
                  src={imageUrl || localImageDisplay}
                  alt="Processed preview"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Upload an image to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleUploadAnother}
              className="group rounded-xl overflow-hidden select-none h-12 w-12 flex items-center justify-center transition-all duration-200 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-blue-400 shadow-sm hover:shadow-md"
              title="Upload another image"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.25 11.25V5C11.25 4.58579 11.5858 4.25 12 4.25C12.4142 4.25 12.75 4.58579 12.75 5V11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H12.75V19C12.75 19.4142 12.4142 19.75 12 19.75C11.5858 19.75 11.25 19.4142 11.25 19V12.75H5C4.58579 12.75 4.25 12.4142 4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H11.25Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
