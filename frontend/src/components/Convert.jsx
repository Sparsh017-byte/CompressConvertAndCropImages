"use client";
import { useState, useEffect } from 'react';
import Uploader from './Uploader';
import Ads from './Ads';
import { Helmet } from "react-helmet";
import ConvertFAQ from './ConvertFAQ';

// Reuse the compression function
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

export default function Convert() {
  const [format, setFormat] = useState('webp');
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [resetCount, setResetCount] = useState(0);

  // 🔥 Clear converted result whenever resetCount changes
  useEffect(() => {
    setConvertedUrl(null);
  }, [resetCount]);

  // Converts and compresses image client-side
  async function handleConvert(file) {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((r) => (img.onload = r));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Convert to selected format
    canvas.toBlob(async (blob) => {
      if (!blob) return;

      let finalBlob = blob;

      // Compress if bigger than 200 KB
      if (blob.size > 200 * 1024) {
        finalBlob = await compressBlobToTargetSize(blob, 150);
      }

      // Convert to target format if different
      if (format !== blob.type.split('/')[1]) {
        canvas.toBlob((convertedBlob) => {
          setConvertedUrl(URL.createObjectURL(convertedBlob));
        }, `image/${format}`);
      } else {
        setConvertedUrl(URL.createObjectURL(finalBlob));
      }
    }, `image/${format}`);
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>
          Free Online Image Converter - Convert Images to JPG, PNG, WebP & More | CCCImages
        </title>
        <meta
          name="description"
          content="Convert images online instantly with CCCImages. Change formats between JPG, PNG, WebP, AVIF, and more for free. Fast, easy-to-use, and no quality loss."
        />
        <meta
          property="og:title"
          content="Free Online Image Converter - Convert Images to JPG, PNG, WebP & More | CCCImages"
        />
        <meta
          property="og:description"
          content="Convert images online instantly with CCCImages. Change formats between JPG, PNG, WebP, AVIF, and more for free. Fast, easy-to-use, and no quality loss."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cccimages.online/convert" />
      </Helmet>
      <Uploader
        resetCount={resetCount}         // ✅ pass resetCount
        setResetCount={setResetCount}   // ✅ pass setResetCount
        actions={({ file, uploading, transform, preview }) => (
          <div className="flex items-center gap-2 flex-wrap mt-3">
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="border rounded p-2"
            >
              <option value="webp">WebP</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="avif">AVIF</option>
            </select>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2"
              disabled={uploading || !file}
              onClick={() => handleConvert(file)}
            >
              Convert & Compress
            </button>
          </div>
        )}
      />

      {convertedUrl && (
        <div className="mt-4 space-y-2">
          <h2 className="font-medium">Converted Result</h2>
          <img
            src={convertedUrl}
            alt="Converted"
            className="max-h-64 w-full object-contain border rounded"
          />
          <a
            href={convertedUrl}
            download={`converted.${format}`}
            onClick={() => {
              if (window.Monetag && typeof window.Monetag.showInterstitial === "function") {
                window.Monetag.showInterstitial();
              }

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

      {/* Article Section */}
      <section className="mt-12 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-bold">How Image Conversion Works</h2>
        <p>
          Image conversion means changing a picture from one file format to
          another, such as <strong>JPG → PNG</strong> or{" "}
          <strong>PNG → WebP</strong>. Each format has its advantages: JPG for
          smaller file size, PNG for transparency, and WebP for modern web
          performance.
        </p>
        <p>
          Converting formats can optimize images for specific use cases like
          printing, web publishing, or app development. Modern browsers support
          <strong> WebP</strong>, which often provides the best balance between
          quality and file size.
        </p>
      </section>
      <ConvertFAQ/>
    </div>
  );
}