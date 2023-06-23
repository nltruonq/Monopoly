const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "lmtrng",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadAvatarUser = async (image) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        transformation: [{ width: 400, aspect_ratio: "1:1", crop: "fill" }],
    };

    try {
        const result = await cloudinary.uploader.upload(image, options);
        // console.log(result);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};

module.exports = { uploadAvatarUser };
