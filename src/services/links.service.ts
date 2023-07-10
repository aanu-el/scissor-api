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
        
        const resolveUrl = await fetch(`https://networkcalc.com/api/dns/lookup/${url}`);
        const response = await resolveUrl.json();
        
        if (response.status == "OK") {
            return true;
        } else {
            return false;
        }
    }
    
}