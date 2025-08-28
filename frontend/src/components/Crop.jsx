"use client";

import { useState } from "react";

import Uploader from "./Uploader.jsx";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

import Ads from './Ads';



async function compressBlobToTargetSize(blob, targetKB) {

  return new Promise((resolve) => {

    const img = new Image();

    const mimeType = blob.type; // keep original type

    img.src = URL.createObjectURL(blob);



    img.onload = () => {

      const canvas = document.createElement("canvas");

      canvas.width = img.width;

      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);



      let quality = 0.9; // start high

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
  const naturalWidth = imgRef.naturalWidth;
  const naturalHeight = imgRef.naturalHeight;
  const displayWidth = imgRef.width;
  const displayHeight = imgRef.height;

  // Calculate scale
  const scaleX = naturalWidth / displayWidth;
  const scaleY = naturalHeight / displayHeight;

  // Calculate actual image area if objectFit: "contain"
  const offsetX = (displayWidth - (naturalWidth / scaleY)) / 2;
  const offsetY = (displayHeight - (naturalHeight / scaleX)) / 2;

  canvas.width = completedCrop.width * scaleX;
  canvas.height = completedCrop.height * scaleY;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    imgRef,
    (completedCrop.x - offsetX) * scaleX,
    (completedCrop.y - offsetY) * scaleY,
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
    0,
    0,
    completedCrop.width * scaleX,
    completedCrop.height * scaleY
  );

  canvas.toBlob((blob) => {
  if (!blob) return;

  (async () => {
    let finalBlob = blob;
    if (blob.size > 200 * 1024) {
      finalBlob = await compressBlobToTargetSize(blob, 150); // target 150 KB
    }
    setCroppedUrl(URL.createObjectURL(finalBlob));
  })();
}, imgRef?.src?.startsWith("data:image/") 
      ? imgRef.src.split(";")[0].split(":")[1] 
      : "image/png"
);
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



                <button className="btn cursor-pointer" onClick={getCroppedImg}>

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

      <Ads adSlot="2018763798" test={true} />

      {/* 📖 Article Section */}

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

          download the cropped version in just one click. It’s designed to be fast,

          lightweight, and runs entirely in your browser — no uploads to external servers.

        </p>



        <h3 className="text-xl font-semibold mb-2">Learn More About Cropping</h3>

        <p className="text-gray-700 mb-4">

          If you’d like to explore more about image cropping and composition, check out these

          helpful resources:

        </p>

        <ul className="list-disc list-inside text-blue-600 underline">

          <li>

            <a

              href="https://www.adobe.com/in/learn/photoshop/web/crop-image?learnIn=1&locale=en-IN"

              target="_blank" rel="noopener noreferrer"

            >

              Adobe Photoshop: Cropping and Straightening

            </a>

          </li>

          <li>

            <a

              href="https://www.canva.com/en_in/help/resize-and-crop/"

              target="_blank" rel="noopener noreferrer"

            >

              Canva Guide: Photo Cropping Tips

            </a>

          </li>

          <li>

            <a

              href="https://en.wikipedia.org/wiki/Cropping_(image)"

              target="_blank" rel="noopener noreferrer"

            >

              Wikipedia: Cropping (Image)

            </a>

          </li>

        </ul>

      </div>



    </div>

  );

}
