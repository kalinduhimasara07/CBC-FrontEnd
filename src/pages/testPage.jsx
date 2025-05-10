import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {
  const [image, setImage] = useState(null);

  function handleImageUpload(event) {
    mediaUpload(image)
      .then((url) => {
        console.log("Image uploaded successfully:", url);
        alert("Image uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
      }); 
  }
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-4">
      <input
        type="file"
        className="mb-4"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setImage(e.target.files[0]);
        }}
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleImageUpload}
      >
        Upload
      </button>
    </div>
  );
}
