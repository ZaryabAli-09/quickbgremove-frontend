import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const Upload = () => {
  const location = useLocation();
  const fileFromState = location.state?.file;

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [localImageDisplay, setLocalImageDisplay] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading

  // this uploadFile logic runs when we click on background remove button we send file to server wheich then server remove bg from it and return the file which we then catch the file in blob and create url from it set image url to that blob generated url and hide the local image from screen
  async function removeBackground() {
    if (!file) {
      return alert("Please choose an image");
    }
    const formData = new FormData();
    formData.append("image", file);

    // Start loading effect
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tools/removebg`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        console.log(res);
      }
      if (res.ok) {
        const blob = await res.blob();

        const processedImageUrl = URL.createObjectURL(blob);
        setLocalImageDisplay(""); // Hide local image

        setImageUrl(processedImageUrl); // Show processed image
      } else {
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading effect
    }
  }

  const handleDownload = () => {
    if (!imageUrl) {
      return alert("No image to download");
    }
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "processed-image.png";
    link.click();
  };

  useEffect(() => {
    if (fileFromState) {
      setFile(fileFromState);
      setLocalImageDisplay(URL.createObjectURL(fileFromState));
    }
  }, []);
  console.log(file);
  return <div>Uploads</div>;
};

export default Upload;
