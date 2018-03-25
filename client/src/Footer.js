import React from 'react';
import './Footer.css';

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <div className="container">
            <div className="page-footer">
              <div className="row align-items-center">
                <div className="col-md-4 text-center"><a href="/terms.html">Terms and Conditions</a></div>
                <div className="col-md-4 text-center"><a href="/privacy.html">Privacy Policy</a></div>
                <div className="col-md-4 text-center"><a href="https://newsapi.org">Built with News API</a></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
