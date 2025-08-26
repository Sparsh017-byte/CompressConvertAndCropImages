import { useState } from 'react';
import Uploader from './Uploader';

export default function Compress() {
  const [targetSize, setTargetSize] = useState(100);

  return (
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
            className="btn cursor-pointer"
            disabled={uploading}
            onClick={() => transform('compress_to_size', { targetSize }, 'output.jpg')}
          >
            Compress
          </button>
        </div>
      )}
    />
  );
}
