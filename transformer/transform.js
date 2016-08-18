var fs = require('fs');
var path = require('path');
var Converter = require('csvtojson').Converter;
var converter = new Converter({});

function isOdd(num) {
  return (num % 2 === 1);
}

module.exports = function transformData(filePath, callback) {
  var csvFile = fs.createReadStream(filePath).pipe(converter);
  var newData = [];
  var parsed = path.parse(filePath);

  csvFile.on('open', function() {
    console.log('opened: ', filePath);
  });

  csvFile.on('data', function(error) {
    // console.log('reading...');
  });

  csvFile.on('end_parsed', function(json) {
    json.forEach(function(row, index) {
      if (!isOdd(index)) {
        newData.push({
          datetime: row['Date/Time'],
          lat: row['Lat'],
          long: row['Lon'],
          dropOffLat: json[index + 1]['Lat'],
          dropOffLong: json[index + 1]['Lon'],
          base: row['Base']
        });
      }
    });
    if (!fs.existsSync('transformed')) {
      fs.mkdir('transformed');
    }
    fs.writeFile(
      path.resolve('transformed', parsed.name + '.json'),
      JSON.stringify({
        traffic_data: newData
      }),
      function(err) {
        console.log('completed');
        callback(null, parsed);
    });
  });
}
