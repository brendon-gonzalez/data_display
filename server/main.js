var koa = require('koa');
var serve = require('koa-static');

var app = koa();
app.use(serve('./dist'))
app.listen(process.env.PORT || 3000);
module.exports = app;
