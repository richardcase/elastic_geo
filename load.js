'use strict';

const StreamArray = require('stream-json/utils/StreamArray');
const path = require('path');
const fs = require('fs');
const axios = require("axios");

let jsonReadStream = StreamArray.make();

let filename = path.join(__dirname, 'data/converted.json');
const elasticUrl = 'http://localhost:9200/restgeo/restaurant'

axios.defaults.headers.post['Content-Type'] = 'application/json';

//You'll get json objects here
jsonReadStream.output.on('data', function ({index, value}) {
    let data = JSON.stringify(value);

    axios.post(elasticUrl,value)
        .then(function(response) {
            console.log('Inserted');
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        })

        
});

jsonReadStream.output.on('end', function () {
	console.log('All done');
});

fs.createReadStream(filename).pipe(jsonReadStream.input);