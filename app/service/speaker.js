const player = require('play-sound')(opts = {});
const AbstractService = require('@jeneric/core/abstract-service');

/** speaker module */
class Speaker extends AbstractService {

    constructor() {
        super();

        this._isSpeaking = false;
        this._queue = [];

    }

    say(message) {

        this.services.marytts.textToSpeech(message, (message, filePath) => {

            this._queue.push({
                message: message,
                filePath: filePath
            });

            this._speak();

        })
    }

    _speak() {
        if(this._isSpeaking || 0 === this._queue.length) return false;

        this._isSpeaking = true;

        let entry = this._queue.shift();

        player.play(entry.filePath, (error) => {
            if (error) throw new Error(error);

            this.services.logger.info(entry.message);
            this._isSpeaking = false;
            this._speak();

        });
    }

    get isSpeaking() {
        return this._isSpeaking;
    }

}

module.exports = Speaker;