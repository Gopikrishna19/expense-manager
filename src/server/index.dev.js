const development = 'development';

module.exports = (app, mode = development) => {
    if (mode === development) {
        const webpack = require('webpack');

        const config = require('../../webpack.config')(null, {});

        const compiler = webpack(config);

        const devMiddleware = require('webpack-dev-middleware')(compiler, {
            stats: 'minimal',
            writeToDisk: true
        });
        const hotMiddleware = require('webpack-hot-middleware')(compiler);

        app.use(devMiddleware);
        app.use(hotMiddleware);
    }
};
