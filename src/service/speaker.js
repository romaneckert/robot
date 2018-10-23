const player = require('play-sound')(opts = {});

/** speaker module */
class Speaker {

    constructor() {
        super();

        this._isSpeaking = false;
        this._queue = [];

    }

    say(message) {

        let entry = {
            message: message,
            filePath: null,
        };

        this._queue.push(entry);

        this.module.marytts.textToSpeech(message, (message, filePath) => {

            entry.filePath = filePath;

            this._speak();

        })
    }

    _speak() {
        if (this._isSpeaking || 0 === this._queue.length || this._queue[0].filePath === null) return false;

        this._isSpeaking = true;

        let entry = this._queue.shift();

        this.logger.debug(entry.message);

        player.play(entry.filePath, (error) => {
            if (error) throw new Error(error);

            this._isSpeaking = false;
            this._speak();

        });
    }

    get isSpeaking() {
        return this._isSpeaking;
    }

}

module.exports = Speaker;
