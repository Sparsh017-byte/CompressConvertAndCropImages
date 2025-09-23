const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const multer = require('multer');
const sharp = require('sharp');
require('dotenv').config();
const mongoose = require('mongoose');
const blogRoutes = require('../routes/blogs');

const app = express();

// ---- Config
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const UPLOAD_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ---- Middleware
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://compress-convert-and-crop-images.vercel.app', // deployed frontend
  'https://www.cccimages.online', // your new custom domain
  'https://cccimages.online' // optional: if root domain is also used
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: Origin ${origin} not allowed`));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/blogs', blogRoutes);

// ---- Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'image-tool-api', time: new Date().toISOString() });
});

// ---- Multer setup
const allowedTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const safe = file.originalname.toLowerCase().replace(/[^a-z0-9_.-]+/g, '-').replace(/-+/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    if (allowedTypes.has(file.mimetype)) cb(null, true);
    else cb(new Error('UNSUPPORTED_FILE_TYPE'));
  },
});

// Utility: safe unlink
async function safeUnlink(p) {
  try {
    await fsp.unlink(p);
  } catch (_) {}
}

// ---- Inspect route
app.post('/api/inspect', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const meta = await sharp(req.file.path).metadata();
    await safeUnlink(req.file.path);
    res.json({
      ok: true,
      filename: req.file.originalname,
      mime: req.file.mimetype,
      sizeBytes: req.file.size,
      width: meta.width,
      height: meta.height,
      format: meta.format,
    });
  } catch (err) {
    next(err);
  }
});

// ---- Echo route
app.post('/api/echo', upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.setHeader('Content-Type', req.file.mimetype);
    const stream = fs.createReadStream(req.file.path);
    stream.pipe(res);
    res.on('finish', () => safeUnlink(req.file.path));
  } catch (err) {
    next(err);
  }
});

// ---- Resize route
app.post('/api/resize', upload.single('image'), async (req, res, next) => {
  try {
    const { width, height } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const w = width ? parseInt(width) : null;
    const h = height ? parseInt(height) : null;

    const outPath = req.file.path + '-resized.png';
    await sharp(req.file.path).resize(w, h).toFile(outPath);

    res.sendFile(outPath, () => {
      safeUnlink(req.file.path);
      safeUnlink(outPath);
    });
  } catch (err) {
    next(err);
  }
});

// ---- Compress route (by quality)
app.post('/api/compress', upload.single('image'), async (req, res, next) => {
  try {
    const { quality } = req.body;
    const q = quality ? parseInt(quality) : 10;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const outPath = req.file.path + '-compressed.jpg';
    await sharp(req.file.path).jpeg({ quality: q }).toFile(outPath);

    res.sendFile(outPath, () => {
      safeUnlink(req.file.path);
      safeUnlink(outPath);
    });
  } catch (err) {
    next(err);
  }
});
// ✅ Crop Route (NEW)
app.post("/api/crop", upload.single("image"), async (req, res) => {
  try {
    // client must send crop values in body: x, y, width, height
    const { x, y, width, height } = req.body;

    const outPath = `uploads/cropped-${Date.now()}.jpg`;

    await sharp(req.file.path)
      .extract({
        left: Math.round(Number(x)),
        top: Math.round(Number(y)),
        width: Math.round(Number(width)),
        height: Math.round(Number(height)),
      })
      .toFile(outPath);

    fs.unlinkSync(req.file.path);
    res.download(outPath, () => fs.unlinkSync(outPath));
  } catch (err) {
    console.error("Crop Error:", err);
    res.status(500).send("Crop failed");
  }
});
// ---- NEW: Compress route (by size) using binary search
app.post('/api/compress_to_size', upload.single('image'), async (req, res, next) => {
  try {
    const { targetSize } = req.body;
    const targetSizeBytes = parseInt(targetSize) * 1024;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!targetSizeBytes || targetSizeBytes <= 0) {
      await safeUnlink(req.file.path);
      return res.status(400).json({ error: 'Invalid target size' });
    }

    const outPath = req.file.path + '-compressed.jpg';
    let minQuality = 1;
    let maxQuality = 100;
    let finalQuality = 80;
    let imageBuffer;
    let lastSize = Infinity;
    
    // Binary search for the optimal quality setting
    for (let i = 0; i < 7; i++) { // 7 iterations are sufficient for most cases
      const midQuality = Math.floor((minQuality + maxQuality) / 2);
      if (minQuality > maxQuality) {
        finalQuality = minQuality;
        break;
      }
      
      const testBuffer = await sharp(req.file.path).jpeg({ quality: midQuality }).toBuffer();
      const testSize = testBuffer.length;
      
      if (testSize <= targetSizeBytes) {
        // We're at or below the target, try for a slightly better quality
        finalQuality = midQuality;
        minQuality = midQuality + 1;
        lastSize = testSize;
      } else {
        // We're over the target, need more compression
        maxQuality = midQuality - 1;
      }
    }
    
    // One last check with the determined final quality
    imageBuffer = await sharp(req.file.path).jpeg({ quality: finalQuality }).toBuffer();
    
    // Fallback if the final image is still larger than the target
    if (imageBuffer.length > targetSizeBytes) {
        const fallbackBuffer = await sharp(req.file.path).jpeg({ quality: finalQuality - 1 }).toBuffer();
        if (fallbackBuffer.length < imageBuffer.length) {
            imageBuffer = fallbackBuffer;
            finalQuality = finalQuality - 1;
        }
    }

    // Handle case where even with minimum quality, the image is too large
    if (imageBuffer.length > targetSizeBytes * 1.05) { // 5% tolerance
      await safeUnlink(req.file.path);
      return res.status(413).json({ error: `Could not compress image to within 5% of ${targetSize}KB.` });
    }

    // Save the final compressed image to a file
    await sharp(imageBuffer).toFile(outPath);
    
    // Send the file and clean up
    res.sendFile(outPath, () => {
      safeUnlink(req.file.path);
      safeUnlink(outPath);
    });

  } catch (err) {
    next(err);
  }
});

// ---- Convert route
app.post('/api/convert', upload.single('image'), async (req, res, next) => {
  try {
    let { format } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // normalize jpg → jpeg
    if (format === 'jpg') format = 'jpeg';

    if (!['jpeg', 'png', 'webp', 'avif'].includes(format)) {
      return res.status(400).json({ error: 'Invalid format. Use jpg/jpeg/png/webp/avif.' });
    }

    const outPath = req.file.path + `-converted.${format}`;
    await sharp(req.file.path)[format]().toFile(outPath);

    res.sendFile(outPath, () => {
      safeUnlink(req.file.path);
      safeUnlink(outPath);
    });
  } catch (err) {
    next(err);
  }
});
app.use(/^\/api\//, (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});


// ---- Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.message === 'UNSUPPORTED_FILE_TYPE') {
    return res.status(415).json({ error: 'Unsupported file type. Use JPEG/PNG/WEBP/AVIF/GIF.' });
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Max 10MB.' });
  }
  return res.status(500).json({ error: 'Server error' });
});



// ---- Start server
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);

  if (!MONGO_URI) {
    console.warn('⚠️  MONGO_URI not set. Blog routes will fail until you set MONGO_URI in .env.');
    return;
  }

  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log("✅ MongoDB connected");
    })
    .catch(err => {
      console.error("❌ Mongo connection error:", err.message);
    });
});
