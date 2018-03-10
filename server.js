const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const YAML = require('yamljs');
const rp = require('request-promise');

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// load selected sources from filesystem
const sources = YAML.load('sources.yaml');

// expose internal api method to retrieve sources
app.get('/api/sources', (req, res) => {
  res.send({ sources: sources });
});

// build string of sources for API call
let sourceStr = '';
sources.forEach(function(source) {
  sourceStr += source + ',';
});
sourceStr = sourceStr.substring(0, sourceStr.length-1);

// set newsapi key
const apiKey = '***REMOVED***';

// set newsapi call options
const apiOpts = {
  uri: 'https://newsapi.org/v2/top-headlines',
  qs: {
    sources: sourceStr,
    apiKey: apiKey
  },
  json: true
} 

// create function to retrieve top headlines from newsapi
function getTopHeadlines() {
  return rp(apiOpts);
}

// expose internal api method to retrieve top headlines
app.get('/api/news', (req, res) => {
  getTopHeadlines()
    .then((news) => { res.json(news); })
    .error((err) => { res.status(500).send(err); });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
