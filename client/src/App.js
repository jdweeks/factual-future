import React, { Component } from 'react';
import { Card, CardLink, CardTitle, CardText } from 'reactstrap';
import './App.css';

class Article extends Component {
  render() {
    return (
      <div>
        <Card body className="text-center">
          <CardTitle>{this.props.from}</CardTitle>
          <CardText>{this.props.title}</CardText>
          <CardLink href={this.props.link}>{this.props.link}</CardLink>
        </Card>
      </div>
    );
  }
}

class App extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ news: res.news }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/news');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const {news} = this.state;
    const articles = news.map(function(article) {
      return <Article title={article.title} from={article.source.name} link={article.url} />
    });

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Factual Future</h1>
        </header>
        { articles }
      </div>
    );
  }
}

export default App;
