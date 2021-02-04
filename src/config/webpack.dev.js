const path = require("path");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { raw, stringified } = require('./server/env');
const { WEBSITE_APP_MOCK, WEBSITE_APP_PORT, WEBSITE_APP_HOST } = raw;

const bodyParser = require('body-parser');
const mockServer = require('./server/mock');

module.exports = function (env, argv) {

    return merge(common(env, argv), {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            host: WEBSITE_APP_HOST || 'localhost',
            compress: true,
            port: WEBSITE_APP_PORT || 8000,
            contentBase: [path.join(__dirname, '../../public')],
            before: function(app, server) {
                if(WEBSITE_APP_MOCK === 'true') {
                    // parse app.body
                    // https://expressjs.com/en/4x/api.html#req.body
                    // create application/json parser
                    app.use(bodyParser.json());
                    // create application/x-www-form-urlencoded parser
                    app.use(bodyParser.urlencoded({ extended: false}));
                    mockServer(app);
                }
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                ...stringified
            })
        ]
    });
}
