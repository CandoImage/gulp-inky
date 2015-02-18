var es      = require('event-stream');
var gutil   = require('gulp-util');
var cheerio = require('cheerio');
var inky    = require('inky');
var Buffer  = require('buffer').Buffer;



module.exports = function (opts) {
  "use strict";

  var body = function (file) {
    if (file.isNull()) { return this.emit('data', file); }
    if (file.isStream()) { return this.emit('error', new Error("gulp-coffee: Streaming not supported")); }

    var str = file.contents.toString('utf8');
    var $ = cheerio.load(str);

    $ = inky.releaseTheKraken($, opts);

    file.contents = new Buffer($.html({normalizeWhitespace: true}));
    this.emit('data', file);
  };

  return es.through(body);
};
