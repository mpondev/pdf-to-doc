const path = require('path');
const express = require('express');
const pdf = require('pdf-parse');
const multer = require('multer');
const fs = require('fs');

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

const upload = multer({
  storage,
});

router.post('/api/uploads', upload.single('pdf'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Retrieve the uploaded file from the request body
    const filePath = path.join('uploads/', req.file.filename);
    console.log('File path: ', filePath);

    // Check if the file exists at the specified path
    const fileExists = await fs.promises
      .access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ error: 'File not found' });
    }

    const data = await pdf(filePath);

    res.send(data.text);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
