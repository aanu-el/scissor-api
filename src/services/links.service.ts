const randomstring = require('randomstring');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export class LinkService {

    randomstring(): string {
        return randomstring.generate({
            length: 6,
            charset: 'alphabetic'
        });
    }

    async validateUrl(url: string) {
        url = url.trim();
        let urlPattern = /^(https?:\/\/|www\.)/i;

        if (urlPattern.test(url) == true) {
            // Remove "http://" or "https://"
            url = url.replace(/^(https?:\/\/)/i, '');

            // Remove "www."
            url = url.replace(/^(www\.)/i, '');
        }


        const resolveUrl = await fetch(`https://networkcalc.com/api/dns/lookup/${url}`);
        const response = await resolveUrl.json();

        if (response.status == "OK") {
            return true;
        } else {
            return false;
        }
    }

    async generateQR(url: string) {
        url = encodeURI(url.trim());

        const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${url}`

        const cloudinaryResponse = await cloudinary.uploader.upload(qrCode);

        return cloudinaryResponse.secure_url;
    }
} 