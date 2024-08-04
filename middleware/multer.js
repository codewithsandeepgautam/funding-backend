const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'dsl3i0tuf',
    api_key: '442869619596953',
    api_secret: 'Gv873dBoT8SHq0-adENwAAci3OM'
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'funding',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`
    },
});

const upload = multer({ storage: storage });

const imageUploadMiddleware = (fieldName) => (req, res, next) => {
    upload.array(fieldName)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.error("Multer error:", err);
            res.status(500).json({ error: "File upload failed due to Multer error" });
        } else if (err) {
            // An unknown error occurred when uploading.
            console.error("Unknown error:", err);
            res.status(500).json({ error: "File upload failed due to an unknown error" });
        } else {
            // Everything went fine.
            console.log("File upload successful");
            next();
        }
    });
};

module.exports = { imageUploadMiddleware };
