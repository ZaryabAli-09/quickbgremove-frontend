import { useState, useEffect } from "react";
import { ImageProcessingBackdrop } from "./ImageProcessingBackdrop";

export default function ImageCanvas({
  imageUrl,
  localImageDisplay,
  loading,
  hsvaToHex,
  hsva,
  selectedBgImage,
  bgColor,
}) {
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    if (imageUrl || localImageDisplay) {
      const img = new Image();
      img.src = imageUrl || localImageDisplay;
      img.onload = () => {
        setAspectRatio(img.width / img.height);
      };
    }
  }, [imageUrl, localImageDisplay]);

  return (
    <div className=" bg-white rounded-2xl p-6 mb-8 border border-gray-200 ">
      <div
        style={{
          ...(selectedBgImage
            ? {
                backgroundImage: `url(${selectedBgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : {}),

          ...(bgColor ? { backgroundColor: hsvaToHex(hsva) } : {}),
          ...(aspectRatio ? { aspectRatio } : { height: "24rem" }),
          maxWidth: "100%", // don’t exceed parent’s width
          maxHeight: "60%", // don’t exceed 80% of screen height
        }}
        className={`relative   h-auto border border-dashed border-gray-300 rounded-xl flex items-center justify-center transition-all duration-300 mx-auto ${
          loading ? "bg-gray-50" : "bg-white"
        }`}
      >
        {loading ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Original image stays visible under overlay */}
            {localImageDisplay || imageUrl ? (
              <img
                loading="lazy"
                className="w-full h-full object-contain rounded-lg"
                src={imageUrl || localImageDisplay}
                alt="Processing preview"
              />
            ) : null}

            {/* Overlay */}
            <ImageProcessingBackdrop />
          </div>
        ) : localImageDisplay || imageUrl ? (
          <img
            loading="lazy"
            className="w-full h-full object-contain rounded-lg"
            src={imageUrl || localImageDisplay}
            alt="Processed preview"
          />
        ) : (
          <div className="text-center  text-gray-400">
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
  );
}
