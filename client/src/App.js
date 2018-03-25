import React, { Component } from 'react';
import { Card, CardLink, CardTitle, CardText } from 'reactstrap';
import Menu from './Menu';
import Footer from './Footer';
import './App.css';

class Article extends Component {
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col">
          <Card body className="articleCard">
            <CardTitle>{this.props.title}</CardTitle>
            <CardText>{this.props.date}</CardText>
            <CardText>{this.props.from}</CardText>
            <CardLink href={this.props.link} target="_blank">{this.props.link}</CardLink>
          </Card>
        </div>
      </div>
    );
  }
}

class App extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ articles: res.articles }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/articles');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    const {articles} = this.state;
    const articlesList = articles.map(function(article) {
      return <Article title={article.title} date={new Date(article.publishedAt).toLocaleString()} from={article.source.name} link={article.url} />
    });

    return (
      <div className="App">
        <Menu />

        <div className="container">
          { articlesList }
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default App;
