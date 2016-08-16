var transform = require('./transform');
var fs = require('fs');
var path = require('path');

// TODO Allow arg for choosing folder path
if (fs.existsSync('raw')) {
  fs.readdir('raw', function(err, files) {
    if (err) {
      return;
    }
    files.forEach(function(filepath) {
      transform(path.resolve('raw', filepath), function(err, result) {
        if (err) {
          return;
        }
        console.log('completed: ', filepath);
      });
    });
  });
}
