import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// make all article links open in new tab
$(document).ready(function() {
  var website = window.location.hostname;
  var internalLinkRegex = new RegExp('^((((http:\\/\\/|https:\\/\\/)(www\\.)?)?'
                                      + website
                                      + ')|(localhost:\\d{4})|(\\/.*))(\\/.*)?$', '');

  $('a').filter(function() {
    var href = $(this).attr('href');
    return !internalLinkRegex.test(href);
  })
  .each(function() {
    $(this).attr('target', '_blank');
  });
});
