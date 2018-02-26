'use strict';

const StreamArray = require('stream-json/utils/StreamArray');
const path = require('path');
const fs = require('fs');

let jsonReadStream = StreamArray.make();

let filename = path.join(__dirname, 'data/restaurants.json');
let writeFileName = path.join(__dirname, 'data/converted.json');

fs.appendFileSync(writeFileName, "[");

//You'll get json objects here
jsonReadStream.output.on('data', function ({index, value}) {
    let lat = value.geo.coordinates[0];
    let long = value.geo.coordinates[1];
    console.log(lat + ' ' + long);
    delete value.geo;

    let location = { 
        'lat': lat,
        'lon': long
    }
    value.location = location;

    fs.appendFileSync(writeFileName, JSON.stringify(value," ", 2) + ",\n");
});

jsonReadStream.output.on('end', function () {
    fs.appendFileSync(writeFileName, "]");
	console.log('All done');
});

fs.createReadStream(filename).pipe(jsonReadStream.input);