import React from "react";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      randomQuote: "You become what you believe.",
      quote: [],
      author: "Oprah Winfrey"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => response.json())
      .then(response => {
        //console.log(response.quotes[0]);
        const allQuotes = response.quotes;
        //console.log(allQuotes);
        this.setState({
          quote: allQuotes
        });
      });
  }

  handleClick(event) {
    this.setState(prevState => {
      const randomNumer = Math.floor(Math.random() * prevState.quote.length);
      //console.log(randomNumer);
      return {
        randomQuote: prevState.quote[randomNumer].quote,
        author: prevState.quote[randomNumer].author
      };
    });
  }

  render() {
    const shareTwitter = "https://twitter.com/intent/tweet?text=";
    //console.log(shareTwitter + this.state.randomQuote)
    return (
      <div className="quoteWindow">
        <h3>" {this.state.randomQuote}</h3>
        <p>{this.state.author}</p>
        <div className="buttons">
          <button>
            <a
              class="twitter-share-button"
              href={shareTwitter + this.state.randomQuote}
            >
              Twitter
            </a>
          </button>
          <button className="quoter" onClick={this.handleClick}>
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default Main;
