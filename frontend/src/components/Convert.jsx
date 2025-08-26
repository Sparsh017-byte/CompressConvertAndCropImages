import { useState } from 'react';
import Uploader from './Uploader';

export default function Convert() {
  const [format, setFormat] = useState('webp');

  return (
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
  );
}
