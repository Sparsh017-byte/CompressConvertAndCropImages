"use client";

import { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

async function compressBlobToTargetSize(blob, targetKB) {
  return new Promise((resolve) => {
    const img = new Image();
    const mimeType = blob.type;
    img.src = URL.createObjectURL(blob);
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let quality = 0.9;
      function compressStep() {
        canvas.toBlob((compressedBlob) => {
          if (!compressedBlob) return resolve(blob);
          const sizeKB = compressedBlob.size / 1024;
          if (sizeKB <= targetKB || quality <= 0.1) {
            resolve(compressedBlob);
          } else {
            quality -= 0.05;
            compressStep();
          }
        }, mimeType, quality);
      }
      compressStep();
    };
  });
}

function Uploader({ actions }) {
  const [preview, setPreview] = useState(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {actions({ preview })}
    </div>
  );
}

export default function CropPage() {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);
  const [croppedUrl, setCroppedUrl] = useState(null);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 80 }, 1, width, height),
        width,
        height
      )
    );
  }

  function getCroppedImg() {
    if (!completedCrop || !imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    // Get the actual displayed size of the image
    const displayWidth = image.width;
    const displayHeight = image.height;
    
    // Get the natural size of the image
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    
    // Calculate the scaling factor due to object-fit: contain
    const scaleX = naturalWidth / displayWidth;
    const scaleY = naturalHeight / displayHeight;
    
    // Calculate the actual pixel coordinates in the original image
    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;
    
    // Set canvas dimensions to match the crop area
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    
    // Draw the cropped portion of the image
    ctx.drawImage(
      image,
      cropX, cropY, cropWidth, cropHeight, // Source coordinates and dimensions
      0, 0, cropWidth, cropHeight          // Destination coordinates and dimensions
    );
    
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      let finalBlob = blob;
      if (blob.size > 200 * 1024) {
        finalBlob = await compressBlobToTargetSize(blob, 150);
      }
      setCroppedUrl(URL.createObjectURL(finalBlob));
    }, "image/png");
  }

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Image Cropping Tool</h1>
      
      <Uploader
        actions={({ preview }) => (
          <>
            {preview && (
              <div className="space-y-4 w-full">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={null}
                  className="w-full"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={preview}
                    onLoad={onImageLoad}
                    style={{
                      maxHeight: "500px",
                      maxWidth: "100%",
                      objectFit: "contain",
                      display: "block",
                      margin: "0 auto"
                    }}
                  />
                </ReactCrop>

                <button 
                  className="btn cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={getCroppedImg}
                >
                  Crop & Preview
                </button>

                {croppedUrl && (
                  <div className="space-y-2">
                    <h2 className="font-medium">Cropped Result</h2>
                    <img
                      src={croppedUrl}
                      alt="Cropped"
                      className="max-h-64 w-full object-contain border rounded"
                    />
                    <a
                      href={croppedUrl}
                      download="cropped.png"
                      className="btn inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Download
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      />
      
      {/* Article Section */}
      <div className="mt-12 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">How Images Are Cropped</h2>
        <p className="text-gray-700 mb-4">
          Image cropping is the process of removing unwanted outer areas from an image 
          to improve its composition, highlight a subject, or adjust dimensions. 
          Cropping is one of the most common and powerful tools in digital image editing, 
          helping optimize pictures for social media, websites, and print.
        </p>

        <h3 className="text-xl font-semibold mb-2">Why Use Cropping?</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Focus attention on the main subject.</li>
          <li>Remove distracting background elements.</li>
          <li>Adjust aspect ratios (e.g., 1:1 for Instagram, 16:9 for videos).</li>
          <li>Improve overall composition and balance.</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">How This Crop Tool Works</h3>
        <p className="text-gray-700 mb-4">
          Our crop tool allows you to upload any image, adjust the crop area using a 
          draggable frame, and instantly preview the result. Once satisfied, you can 
          download the cropped version in just one click. It's designed to be fast, 
          lightweight, and runs entirely in your browser — no uploads to external servers.
        </p>
      </div>
    </div>
  );
}
