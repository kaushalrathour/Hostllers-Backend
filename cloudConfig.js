const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("@fluidjs/multer-cloudinary").CloudinaryStorage;


cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage ({
    cloudinary,
    params: {
        allowed_formats: ["png", "jpg", "jpeg"],
        folder: "Hostellers",
        max_file_size: 4 * 1024 * 1024 // 4 MB
    }
});

const upload = multer({storage});

module.exports = {
    cloudinary,
    upload
}
    
    