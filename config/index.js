'use strict';

require('dotenv').config();
const _ = require('underscore');

const env = process.env.NODE_ENV;
const baseConfig = require('./config.base.json');
const envOverride = env ? require(`./config.${env}.json`) : require('./config.dev.json');
module.exports = _.extend(baseConfig, envOverride);  