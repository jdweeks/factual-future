const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

const YAML = require('yamljs');
const rp = require('request-promise');
const fs = require('fs');

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// load selected sources from filesystem
const sources = YAML.load('./data/sources.yaml');

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

// function to retrieve top headlines from newsapi
function getTopHeadlines() {
  return rp(apiOpts);
}

// function to cache headline data
function cacheTopHeadlines(next) {
  getTopHeadlines()
    .then((data) => { 
      fs.writeFile('./data/news.json', JSON.stringify(data), (err) => {
        if (err) console.error(err);;
        next();
      });
    })
    .error((err) => { 
      console.error(err);
    });
}

// initial load
cacheTopHeadlines(loadTopHeadlines);

// reload every 30 mins
setInterval(() => { cacheTopHeadlines(loadTopHeadlines); }, 30*60*1000);

// function to load headline data from filesystem
let news = {};
function loadTopHeadlines() {
  fs.readFile('./data/news.json', (err, data) => {
    if (err) console.error(err);
    news = JSON.parse(data);
  });
}

// synchronize filesystem cache with in-memory news data
// fs.watch('./data/news.json', (eventType) => {
//   if (eventType === 'change')
//     loadTopHeadlines();
//   else if (eventType === 'error')
//     console.error('Error in news data');
// });

// expose internal api method to retrieve top headlines
app.get('/api/articles', (req, res) => {
  res.json({ articles: news.articles });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
