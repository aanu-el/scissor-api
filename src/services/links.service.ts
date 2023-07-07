export class LinkService {

    randomstring(): string {
        const randomstring = require('randomstring');

        return randomstring.generate({
            length: 6,
            charset: 'alphabetic'
        });
    }

    
}