'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf.argv()
    .env([
        'DATA_BACKEND',
        'GCLOUD_PROJECT',
        'INSTANCE_CONNECTION_NAME',
        'NODE_ENV',
        'PORT'
    ])
    .file({ file: path.join(__dirname, 'config.json') })
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
