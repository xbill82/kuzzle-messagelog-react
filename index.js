'use strict';

var fs = require('fs');
var path = require('path');

var objectAssign = require('object-assign');

var express = require('express');
var app = express();

var compress = require('compression');
var layouts = require('express-ejs-layouts');

app.set('layout');
app.set('view engine', 'ejs');
app.set('view options', {layout: 'layout'});
app.set('views', path.join(process.cwd(), '/server/views'));

app.use(compress());
app.use(layouts);
app.use('/client', express.static(path.join(process.cwd(), '/client')));
app.use('/assets', express.static(path.join(process.cwd(), '/client/assets')));

app.disable('x-powered-by');

var env = {
  production: process.env.NODE_ENV === 'production'
};

if (env.production) {
  objectAssign(env, {
    assets: JSON.parse(fs.readFileSync(path.join(process.cwd(), 'assets.json')))
  });
}

app.get('/*', function(req, res) {
  res.render('index', {
    env: env
  });
});

var EXPRESS_PORT = 3001;
var DEV_SERVER_PORT = 3005;

env.devServerPort = DEV_SERVER_PORT;

var port = Number(process.env.PORT || EXPRESS_PORT);
app.listen(port, function () {
  console.log('server running at localhost:' + EXPRESS_PORT + ', go refresh and see magic');
});

if (env.production === false) {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig = require('./webpack.dev.config');

  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: '/client/',

    contentBase: './client/',

    inline: true,

    hot: true,

    stats: false,

    historyApiFallback: true,

    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:' + EXPRESS_PORT,
      'Access-Control-Allow-Headers': 'X-Requested-With'
    }
  }).listen(DEV_SERVER_PORT, 'localhost', function (err) {
    if (err) {
      console.log(err);
    }

    console.log('webpack dev server listening on localhost:' + DEV_SERVER_PORT);
  });
}
