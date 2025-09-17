"use client";
import { useState, useEffect } from "react";
import Uploader from "./Uploader.jsx";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Ads from './Ads';
import { Helmet } from "react-helmet";
import CropFAQ from "./CropFAQ.jsx";

export async function compressBlobToTargetSize(blob, targetKB) {
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

export default function CropPage() {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [croppedUrl, setCroppedUrl] = useState(null);
  const [resetCount, setResetCount] = useState(0);

  // 🔥 Clear cropped result whenever resetCount changes
  useEffect(() => {
    setCroppedUrl(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
  }, [resetCount]);

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
    if (!completedCrop || !imgRef) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      let finalBlob = blob;
      if (blob.size > 200 * 1024) {
        finalBlob = await compressBlobToTargetSize(blob, 150);
      }
      setCroppedUrl(URL.createObjectURL(finalBlob));
    }, 'image/png');
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>
          Free Online Image Cropper - Crop & Resize Photos Easily | CCCImages
        </title>
        <meta
          name="description"
          content="Crop images online instantly with CCCImages. Easily cut, resize, and adjust your photos to any aspect ratio. Free, fast, and easy-to-use online image crop tool."
        />
        <meta
          property="og:title"
          content="Free Online Image Cropper - Crop & Resize Photos Easily | CCCImages"
        />
        <meta
          property="og:description"
          content="Crop images online instantly with CCCImages. Easily cut, resize, and adjust your photos to any aspect ratio. Free, fast, and easy-to-use online image crop tool."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cccimages.online/crop" />
        <link rel="canonical" href="https://cccimages.online/crop" />
      </Helmet>

      <Uploader
        resetCount={resetCount}
        setResetCount={setResetCount}
        actions={({ preview, transform, uploading, file }) => (
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
                    ref={setImgRef}
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
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                      onClick={() => {
                        

                        setTimeout(() => {
                          const link = document.createElement("a");
                          link.href = convertedUrl;
                          link.download = `converted.${format}`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);

                          if (window.gtag) {
                            window.gtag("event", "image_download", {
                              event_category: "engagement",
                              event_label: `converted.${format}`,
                              value: 1,
                            });
                          }
                        }, 1000);
                      }}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4"
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

      {/* 📖 Article Section */}
      <div className="mt-12 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">How Images Are Cropped</h2>
        <p className="text-gray-700 mb-4">
          Image cropping is the process of removing unwanted outer areas from an image
          to improve its composition, highlight a subject, or adjust dimensions.
        </p>
        <h3 className="text-xl font-semibold mb-2">Why Use Cropping?</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Focus attention on the main subject.</li>
          <li>Remove distracting background elements.</li>
          <li>Adjust aspect ratios (e.g., 1:1 for Instagram, 16:9 for videos).</li>
          <li>Improve overall composition and balance.</li>
        </ul>
      </div>
      <CropFAQ/>
    </div>
  );
}
