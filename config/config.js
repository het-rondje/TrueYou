//
// Application configuration
//
'use strict';

// Set the logging level.
const loglevel = process.env.LOGLEVEL || 'trace'

module.exports = {

    webPort: process.env.PORT || 400,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || 'dev',
    dbPassword: process.env.DB_PASSWORD || 'studitpassword',
    dbDatabase: process.env.DB_DATABASE || 'studit',

    logger: require('tracer')
        .console({
            format: [
                "{{timestamp}} <{{title}}> {{file}}:{{line}} : {{message}}"
            ],
            preprocess: function (data) {
                data.title = data.title.toUpperCase();
            },
            dateformat: "isoUtcDateTime",
            level: loglevel
        })
}