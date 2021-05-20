const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const createError = require('http-errors');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'avatars',
            format: 'jpeg',
            public_id: req.user.id
        }
    }
});

const fileFilter = (req, file, cb) => {
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const ext = file.originalname.split('.').pop();
    if (!validExtensions.includes(ext)) {
        req.fileValidationError = 'Please, upload a valid image';
        return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
};

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5000000, // 5MB
    }
});