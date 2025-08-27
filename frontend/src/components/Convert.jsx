import { useState } from 'react';
import Uploader from './Uploader';
import Ads from './Ads';

export default function Convert() {
  const [format, setFormat] = useState('webp');

  return (
    <div className="space-y-6">
      <Uploader
      actions={({ transform, uploading }) => (
        <div className="flex items-center gap-2">
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
            className="btn cursor-pointer"
            disabled={uploading}
            onClick={() => transform('convert', { format }, `output.${format}`)}
          >
            Convert
          </button>
        </div>
      )}
    />
    <Ads adSlot="YOUR_AD_SLOT_ID" test={true} />
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
        <h3 className="text-lg font-semibold">Learn More:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              MDN: Common Image File Formats
            </a>
          </li>
          <li>
            <a
              href="https://en.wikipedia.org/wiki/Comparison_of_graphics_file_formats"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Wikipedia: Graphics File Format Comparison
            </a>
          </li>
        </ul>
      </section>

    </div>
  );
}

