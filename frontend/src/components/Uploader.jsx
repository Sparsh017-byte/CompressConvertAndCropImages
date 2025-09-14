import { useCallback, useState } from 'react';
import axios from 'axios';
import API from '../api.js';
export default function Uploader({ actions }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFilename, setOutputFilename] = useState('output.png');
  const [resetCount, setResetCount] = useState(0);

  // --- File picking ---
  const pickFile = useCallback((f) => {
    if (!f) return;
    setError('');
    const okTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!okTypes.includes(f.type)) {
      setError('Unsupported file type. Use JPEG/PNG/WEBP/AVIF/GIF.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File too large. Max 10MB.');
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setOutput(null);
    setOutputFilename('output.png');
  }, []);

  const onChange = (e) => pickFile(e.target.files?.[0]);
  const onDrop = (e) => {
    e.preventDefault();
    pickFile(e.dataTransfer.files?.[0]);
  };
  const onDragOver = (e) => e.preventDefault();

  // --- Reset everything ---
  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    if (output) URL.revokeObjectURL(output);
    setFile(null);
    setPreview(null);
    setOutput(null);
    setError('');
    setUploading(false);
    setProgress(0);
    setOutputFilename('output.png');
    if (setResetCount) {
      setResetCount((c) => c + 1); // 🔥 trigger parent reset
    }
  };

  // --- Transform / Upload ---
  async function transform(endpoint, body = {}, filename = 'output.png') {
    if (!file) return alert('Select a file first!');
    setUploading(true);
    setProgress(0);
    setError('');
    try {
      const form = new FormData();
      form.append('image', file);
      Object.entries(body).forEach(([k, v]) => form.append(k, v));

      const res = await API.post(`/api/${endpoint}`, form, {
        responseType: 'blob',
        onUploadProgress: (p) => {
          if (p.total) setProgress(Math.round((p.loaded / p.total) * 100));
        },
      });

      const url = URL.createObjectURL(res.data);
      setOutput(url);
      setOutputFilename(filename);
    } catch (e) {
      setError(e?.response?.data?.error || 'Transform failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="bg-white border-2 border-dashed rounded-2xl p-6 text-center"
      >
        <p className="mb-2 font-medium">Drag & drop an image here</p>
        <p className="text-sm text-gray-500 mb-4">or</p>
        <label className="btn cursor-pointer inline-block">
          Choose file (MAX 10MB)
          <input type="file" accept="image/*" className="hidden" onChange={onChange} />
        </label>
      </div>

      {/* Preview */}
      {file && preview && (
        <div className="card p-4 border rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <div>
              {file.name} • {(file.size / 1024).toFixed(1)} KB • {file.type}
            </div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={reset}>
              Reset
            </button>
          </div>
          <img src={preview} alt="preview" className="max-h-64 object-contain w-full border rounded" />

          {/* Actions passed from parent (Convert / Compress / Crop etc.) */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {actions({ transform, uploading, file, preview, resetCount })}
          </div>

          {uploading && <div className="text-sm text-gray-500">Uploading… {progress}%</div>}

          {/* Output */}
          {output && (
            <div className="mt-3">
              <h2 className="font-medium">Output</h2>
              <img
                src={output}
                alt="output"
                className="max-h-64 w-full object-contain border rounded"
              />
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-4"
                onClick={() => {
                  // Show Monetag ad first
                  if (window.Monetag && typeof window.Monetag.showInterstitial === "function") {
                    window.Monetag.showInterstitial();
                  }

                  // Trigger download after short delay (to let ad show)
                  setTimeout(() => {
                    const link = document.createElement("a");
                    link.href = output;
                    link.download = outputFilename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Analytics
                    if (window.gtag) {
                      window.gtag("event", "image_download", {
                        event_category: "engagement",
                        event_label: outputFilename,
                        value: 1,
                      });
                    }
                  }, 2000); // 2s delay (adjust as needed)
                }}
              >
                Download
              </button>

            </div>
          )}


          {/* Error */}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      )}
    </div>
  );
}
