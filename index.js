#!/usr/bin/env node

const path = require('path');
const core = require('@jeneric/core');

core.init(
    path.join(__dirname, 'node_modules/@jeneric/cms'),
    __dirname
);
