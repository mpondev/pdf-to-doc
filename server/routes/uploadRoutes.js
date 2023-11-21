const path = require('path');
const express = require('express');
const pdf = require('pdf-parse');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// function checkFileType(file, cb) {
//   const filetypes = /pdf/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('PDF only');
//   }
// }

const upload = multer({
  storage,
});

router.post('/api/uploads', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const filePath = path.join('uploads/', req.file.filename);
    const data = await pdf(filePath);

    res.send(data.text);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
