const webpack = require('webpack');

const config = require('../../webpack.config')(null, {});

const compiler = webpack(config);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: 'minimal'
});
const hotMiddleware = require('webpack-hot-middleware')(compiler);

module.exports = app => {
    app.use(devMiddleware);
    app.use(hotMiddleware);
};
