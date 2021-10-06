const cloudinary = require('cloudinary').v2;
const { promisify } = require('util');
require('dotenv').config();
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_CLOUD_KEY = process.env.API_CLOUD_KEY;
const API_CLOUD_SECRET = process.env.API_CLOUD_SECRET;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_CLOUD_KEY,
    api_secret: API_CLOUD_SECRET,
});

const uploadCloud = promisify(cloudinary.uploader.upload)

class UploadCloudinary {    
    async saveAvatar(pathFile, oldCloudAvatar) {
        // const data = await uploadCloud(pathFile, {
        //     public_id: oldCloudAvatar?.replace("CloudAvatar/", ''),
        //     folder: "CloudAvatar",
        //     transformation: { width: 250, height: 250, crop: "pad" },
        // });
        // console.log(data);

        const { public_id: idCloudAvatar , secure_url: avatarURL } = await uploadCloud(pathFile, {
            public_id: oldCloudAvatar?.replace("CloudAvatar/", ''),
            folder: "CloudAvatar",
            transformation: {width: 250, height: 250, crop: "pad"},
        })
        return {idCloudAvatar, avatarURL};
    };
}

module.exports = UploadCloudinary;
