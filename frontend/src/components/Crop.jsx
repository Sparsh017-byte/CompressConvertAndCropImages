"use client";
import { useState } from "react";
import Uploader from "./Uploader.jsx";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function CropPage() {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [croppedUrl, setCroppedUrl] = useState(null);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    // Default centered crop
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

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setCroppedUrl(url);
    }, "image/png");
  }

  return (
    <div className="space-y-6">
      <Uploader
        actions={({ preview }) => (
          <>
            {preview && (
              <div className="space-y-4 w-full">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={null} // free crop, no fixed ratio
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
                      margin: "0 auto"   // centers horizontally
                    }}
                  />
                </ReactCrop>

                <button className="btn" onClick={getCroppedImg}>
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
                      className="btn inline-block mt-2"
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
    </div>
  );
}
