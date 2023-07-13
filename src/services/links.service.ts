const randomstring = require('randomstring');

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

}