'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf
// 1. Command-line arguments
    .argv()
    // 2. Environment variables
    .env([
        'DATA_BACKEND',
        'GCLOUD_PROJECT',
        'INSTANCE_CONNECTION_NAME',
        'MONGO_URL',
        'MONGO_COLLECTION',
        'MYSQL_USER',
        'MYSQL_PASSWORD',
        'NODE_ENV',
        'PORT'
    ])
    // 3. Config file
    .file({ file: path.join(__dirname, 'config.json') })
    // 4. Defaults
    .defaults({
        DATA_BACKEND: 'datastore',
        GCLOUD_PROJECT: '',
        PORT: 3000
    });

// Check for required settings
checkConfig('GCLOUD_PROJECT');

function checkConfig (setting) {
    if (!nconf.get(setting)) {
        throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
    }
}
