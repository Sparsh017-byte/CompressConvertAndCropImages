import { useState } from 'react';
import Uploader from './Uploader';
import Ads from './Ads';

export default function Compress() {
  const [targetSize, setTargetSize] = useState(100);

  return (
    <div className="space-y-6">
      <Uploader
      actions={({ transform, uploading }) => (
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={targetSize}
            onChange={(e) => setTargetSize(e.target.value)}
            min="1"
            className="w-24 text-center border p-2 rounded"
          />
          <span className="text-sm text-gray-500">KB</span>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={uploading}
            onClick={() => transform('compress_to_size', { targetSize }, 'output.jpg')}
          >
            Compress
          </button>
        </div>
      )}
    />
    <Ads adSlot="2408843705" test={true} />
    {/* Article Section */}
      <section className="mt-12 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-bold">How Image Compression Works</h2>
        <p>
          Image compression reduces the file size of an image without
          significantly affecting its visual quality. This is achieved using
          techniques such as removing unnecessary metadata, reducing color depth,
          or applying mathematical algorithms like{" "}
          <strong>lossy compression (JPEG)</strong> or{" "}
          <strong>lossless compression (PNG, WebP)</strong>.
        </p>
        <p>
          Compressed images load faster on websites, save storage space, and
          improve SEO and user experience. Choosing the right compression method
          depends on whether you want to preserve all details (lossless) or
          allow slight quality reduction for much smaller sizes (lossy).
        </p>
        <h3 className="text-lg font-semibold">Learn More:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Image_compression"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Wikipedia: Image Compression
            </a>
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              MDN: Image Types and Compression
            </a>
          </li>
        </ul>
      </section>

    </div>
    
    
  );
}

