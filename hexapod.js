#!/usr/bin/env node

const sleep = require('sleep');
const speaker = require('./essentials/speaker');

class Hexapod {

    constructor() {

        speaker.config = {
            'directory' : 'sound'
        };

        console.log('hello');

    }
}

var hexapod = new Hexapod();